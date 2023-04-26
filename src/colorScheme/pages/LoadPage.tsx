import { useState, useEffect, useRef } from 'react';
import { CiFolderOn as pageIcon } from 'react-icons/ci';

import { useDataProviders } from '../../DataProvidersContext';
import ColorScheme, { generateColorSchemeId } from '../ColorScheme';
import ColorSchemeExtractor from '../ColorSchemeExtractor';
import ColorSchemesList from '../components/ColorSchemesList';
import CorePage from '../../CorePage';
import Button from '../../components/Button';

const PAGE_NAME = "Load";
const PAGE_PATH = "/load";

export const LoadPage: CorePage = ({}) => {
    
    const [ files, setFiles ] = useState<File[]>([]);
    const [ colorSchemes, setColorSchemes ] = useState<ColorScheme[]>([]);
    
    const { colorSchemeDao } = useDataProviders();
    
    const defaultFileInputRef = useRef<HTMLInputElement>(null);
    
    const onSave = () => {
        colorSchemeDao.saveItems(colorSchemes).then((result) => {
            console.log("Color schemes saved successfully, ", result);
        }).catch((error) => {
            console.log("Error saving color schemes: ", error);
        })
    }
    
    const getFiles = (event: any) => {
        
        const files = event.target.files;
        const fileNames = [];
        
        for (let i = 0; i < files.length; i++) {
            console.log("Got file from input: ", files[i]);
          fileNames.push(files[i]);
        }
        
        setFiles(fileNames);
    }
    
    const readFileContents = async (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.onload = () => {
              resolve({ name: file.name, content: fileReader.result });
            };

            fileReader.onerror = () => {
              reject(new Error('Error reading file'));
            };

            fileReader.readAsText(file);
        });
    };
    
    const getFileSchemes = async (files: File[]) => {
        const newColorSchemes: ColorScheme[] = [];
        
        for(let file of files) {
            const response: any = await readFileContents(file);
            console.log("fileFromInputContents: ", response);
            const colors = ColorSchemeExtractor.extractColors(response.content);
            try {
                const colorScheme = {
                    id: generateColorSchemeId(colors), 
                    // remove extension
                    name: response.name.slice(0, response.name.lastIndexOf('.')), 
                    colors
                } as ColorScheme;
                newColorSchemes.push(colorScheme);
                console.log("Created new color scheme: ", colorScheme);
            }
            catch(error){
                console.warn("Error generating color scheme for file: ", response.name);
                console.error(error);
            };           
            
        }
        return newColorSchemes;
    }
    
    useEffect(() => {
        
        getFileSchemes(files).then((newColorSchemes: ColorScheme[]) => {
            console.log("New color schemes: ", newColorSchemes);
            setColorSchemes(newColorSchemes);
        }).catch((error) => {
            console.error("Error reading file ", error);
        })
                
    }, [files]);
    
    return(
        <div id="load-page">
            <h1>{PAGE_NAME}</h1>

            <div className="center-contents control-strip">
                <Button value="Select files to load" onClick={(e) => 
                    defaultFileInputRef?.current?.click()
                } />
                <input type="file" id="folderInput" name="folderInput" multiple
                    onChange={getFiles} ref={defaultFileInputRef}
                    style={{display: "none"}} />

                <Button value="Save" onClick={onSave} />
            </div>
            
            <div className="center-contents messages">
                { colorSchemes.length > 0 &&
                    <div className="message">
                        Number of Color Schemes: {colorSchemes.length}
                    </div>
                }
                { files.length > 0 &&
                    <div className="message">
                        Files Loaded: {files.map((file) => file.name).join(', ')}
                    </div>
                }
            </div>
               
            <ColorSchemesList colorSchemes={colorSchemes} />
            
        </div>
    );
};

LoadPage.pageName = PAGE_NAME;
LoadPage.pageRoutePath = PAGE_PATH;
LoadPage.pageIcon = pageIcon;

export default LoadPage;