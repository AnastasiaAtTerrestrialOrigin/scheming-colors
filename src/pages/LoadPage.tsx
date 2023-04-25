import { useState, useEffect } from 'react';
import { } from '@terrestrialorigin/core';

import { useDataProviders } from '../DataProvidersContext';
import ColorScheme, { generateColorSchemeId } from '../colorScheme/ColorScheme';
import ColorSchemeExtractor from '../colorScheme/ColorSchemeExtractor';
import ColorSchemePreview from '../colorScheme/components/ColorSchemePreview';
import ColorSchemesList from '../colorScheme/components/ColorSchemesList';

import './colorSchemes.css';

export const LoadPage: React.FC = ({}) => {
    
    const [ files, setFiles ] = useState<File[]>([]);
    const [ colorSchemes, setColorSchemes ] = useState<ColorScheme[]>([]);
    
    const { colorSchemeDao } = useDataProviders();
    
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
            <h1>{process.env.REACT_APP_APP_NAME}</h1>
            <div className="input-holder">
                <label htmlFor="folderInput">Select foles to load</label>
                <input type="file" id="folderInput" name="folderInput" multiple
                    onChange={getFiles}/>
            </div>
            <div className="input-holder">
                <input type="button" value="save" onClick={onSave} />
            </div>
               
            <div>
                <>
                    Color schemes length: {colorSchemes.length}<br />
                    Files: {files.map((file) => file.name).join(',')}
                </>
            </div>
            
            <ColorSchemesList colorSchemes={colorSchemes} />
            
        </div>
    );
};

export default LoadPage;