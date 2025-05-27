import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Photobooth from './pages/Photobooth';
import Photostrip from './pages/Photostrip';
import Result from './pages/Result';
import Custom from './pages/Custom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photobooth" element={<Photobooth />} />
        <Route path="/photostrip" element={<Photostrip />} />
        <Route path="/result" element={<Result />} />
        <Route path="/custom" element={<Custom />} />
      </Routes>
    </Router>
  );
}

export default App;
