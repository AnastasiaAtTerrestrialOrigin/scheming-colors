import { useContext, createContext } from 'react';
import ColorSchemeDao from './colorScheme/ColorSchemeDao';

export const dataProviders = {
    colorSchemeDao: new ColorSchemeDao(),
}

export const DataProvidersContext = createContext(dataProviders);

export function useDataProviders() {
    return useContext(DataProvidersContext);
}