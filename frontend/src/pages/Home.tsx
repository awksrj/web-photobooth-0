import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import HomeLogo from "../assets/images/home_logo.png";
import LeftDecor from "../assets/images/left decor.png";
import RightDecor from "../assets/images/right_decor.png";

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


      <div className='decor-container'>
        
        <img src={RightDecor} alt="Right Decor" style = {{width: "100px", height: "150px", marginTop: "100px"}}/>

        <div className="container">
          <img src={HomeLogo} alt="home_logo" style={{ width: "200px", height: "200px"}}/>
          <div className="main-page-name">The Photobooth</div>
          <div className="button-container">
            <button className="button" onClick={navigateToPhotobooth}>
              <span>Take Photos</span>
            </button>
            <button className="button" onClick={navigateToPhotostrip}>
              <span>Upload Photos</span>
            </button>
          </div>
        </div>

        <img src={LeftDecor} alt="Left Decor" style = {{width: "150px", height: "200px", marginTop: "150px"}}/>
        
      </div>

    </div>
  );
}

export default Home;