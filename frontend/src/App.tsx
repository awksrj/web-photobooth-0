import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Photobooth from './pages/Photobooth';
import Photostrip from './pages/Photostrip';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ margin: '0 1rem' }}>Home</Link>
        <Link to="/photobooth" style={{ margin: '0 1rem' }}>Photobooth</Link>
        <Link to="/photostrip" style={{ margin: '0 1rem' }}>Photostrip</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photobooth" element={<Photobooth />} />
        <Route path="/photostrip" element={<Photostrip />} />
      </Routes>
    </Router>
  );
}

export default App;
