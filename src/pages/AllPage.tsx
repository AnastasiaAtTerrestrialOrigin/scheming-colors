import { useState, useEffect } from 'react';

import { useDataProviders } from '../DataProvidersContext';
import ColorScheme from '../colorScheme/ColorScheme';
import ColorSchemesList from '../colorScheme/components/ColorSchemesList';

export const AllPage: React.FC = ({}) => {
    
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
            This page shows all color schemes;

            <ColorSchemesList colorSchemes={colorSchemes} />
        </div>
    );
};

export default AllPage;
