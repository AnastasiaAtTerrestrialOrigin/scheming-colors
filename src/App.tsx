import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// pages
import AllPage from './pages/AllPage';
import NewPage from './pages/NewPage';
import LoadPage from './pages/LoadPage';
import { DataProvidersContext, dataProviders } from './DataProvidersContext';

function App() {
    return (
        <DataProvidersContext.Provider value={dataProviders}>
            <Router>
                <section id="main">
                    <ul id="main-nav">
                        <li><Link to="/">View All</Link></li>
                        <li><Link to="/new">New</Link></li>
                        <li><Link to="/load">Load</Link></li>
                    </ul>

                    <Routes>
                        <Route path="/" element={<AllPage />} />
                        <Route path="/new" element={<NewPage />} />
                        <Route path="/load" element={<LoadPage />} />
                    </Routes>
                </section>
            </Router>
        </DataProvidersContext.Provider>
    );
    }

export default App;
