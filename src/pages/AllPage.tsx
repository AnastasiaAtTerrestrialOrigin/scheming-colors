import { useState, useEffect } from 'react';
import { CiPalette as pageIcon } from 'react-icons/ci';

import { useDataProviders } from '../DataProvidersContext';
import ColorScheme from '../colorScheme/ColorScheme';
import ColorSchemesList from '../colorScheme/components/ColorSchemesList';
import CorePage from '../CorePage';

const PAGE_NAME = "View All";
const PAGE_PATH = "/view";

export const AllPage: CorePage = ({}) => {
    
    const [ colorSchemes, setColorSchemes ] = useState<ColorScheme[]>([]);
    const { colorSchemeDao } = useDataProviders();
    
    useEffect(()=>{
        let unstubscribe;
        
        console.log("getting color schemes");
        
        colorSchemeDao.getAllOnUpdate(
            (updatedColorSchemes: ColorScheme[]) => setColorSchemes(updatedColorSchemes),
            (error:any) => {
                console.error("Error getting color schemes: ", error);
                alert("Error getting color schemes");
            }).then((unsubscribeFromUpdate) => unstubscribe = unsubscribeFromUpdate);
        
        return unstubscribe;
    }, []);
 
    return (
        <div id="all-page">
            <ColorSchemesList colorSchemes={colorSchemes} />
        </div>
    );
};

AllPage.pageName = PAGE_NAME;
AllPage.pageRoutePath = PAGE_PATH;
AllPage.pageIcon = pageIcon;

export default AllPage;
