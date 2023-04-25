import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CorePage from './CorePage';
import Menu from './components/Menu';

// pages
import AllPage from './pages/AllPage';
import NewPage from './pages/NewPage';
import LoadPage from './pages/LoadPage';
import { DataProvidersContext, dataProviders } from './DataProvidersContext';

function App() {
    
    const [ allPages, setAllPages ] = useState<CorePage[]>([
        AllPage, NewPage, LoadPage
    ]);
    const [ pagesInMainMenu, setPagesInMainMenu ] = useState<CorePage[]>([
        AllPage, NewPage, LoadPage
    ]);
    
    const MainPage = AllPage;
    
    return (
        <DataProvidersContext.Provider value={dataProviders}>
            <Router>
                <section id="main">
                
                    <Menu pages={pagesInMainMenu} />

                    <Routes>
                        
                    
                        { allPages.map((Page, index) => 
                            <Route path={Page.pageRoutePath} key={`reactRoute${index}`}
                                element={<Page />} />  
                        )}

                        <Route path="/" element={<MainPage />} />
                        
                    </Routes>
                </section>
            </Router>
            
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </DataProvidersContext.Provider>
    );
    }

export default App;
