import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  
  const navigateToPhotobooth = () => {
    navigate('/photobooth');
  }

  const navigateToPhotostrip = () => {
    navigate('/photostrip');
  }

  return (
    <div className="home-page">
      <div className="home-logo">logo</div>
      <h1>The Photobooth</h1>

      <div className="button-container">
        <button className="button" onClick={navigateToPhotobooth}>
          <span>Photo Booth</span>
        </button>
        
        <button className="button" onClick={navigateToPhotostrip}>
          <span>Photo Strip</span>
        </button>
      </div>
    </div>
  );
}

export default Home;