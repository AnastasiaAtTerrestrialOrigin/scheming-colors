import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// pages
import AllPage from './pages/AllPage';
import NewPage from './pages/NewPage';

function App() {
  return (
    <Router>
        <section id="main">
            <ul id="main-nav">
                <li><Link to="/">View All</Link></li>
                <li><Link to="/new">New</Link></li>
            </ul>
            
            <Routes>
                <Route path="/" element={<AllPage />} />
                <Route path="/new" element={<NewPage />} />
            </Routes>
        </section>
    </Router>
  );
}

export default App;
