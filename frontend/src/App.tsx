import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Photobooth from './pages/Photobooth';
import Photostrip from './pages/Photostrip';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photobooth" element={<Photobooth />} />
        <Route path="/photostrip" element={<Photostrip />} />
      </Routes>
    </Router>
  );
}

export default App;
