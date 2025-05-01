import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import {colors, fonts} from '../styles/theme.js';

function Home() {
  const navigate = useNavigate();
  
  const navigateToPhotobooth = () => {
    navigate('/photobooth');
  }

  const navigateToPhotostrip = () => {
    navigate('/photostrip');
  }

  return (
    <div className="background-container">
      <div className="info-container">
        <div className="share">share</div>
        <div className="about">about</div>
      </div>
      <div className="container">
        <div className="home-logo">logo</div>
        <div className="main-page-name">The Photobooth</div>
        <div className="button-container">
          <button className="button" onClick={navigateToPhotobooth}>
            <span>take photos</span>
          </button>
          <button className="button" onClick={navigateToPhotostrip}>
            <span>upload photos</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;