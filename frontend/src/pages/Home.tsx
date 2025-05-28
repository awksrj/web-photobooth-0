import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import HomeLogo from "../assets/images/home_logo.png";
import LeftDecor from "../assets/images/left decor.png";
import RightDecor from "../assets/images/right_decor.png";

interface FeedbackPromptProps {
  message: string;
  placeholder?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

function FeedbackPrompt({message, placeholder = "", onConfirm, onCancel}: FeedbackPromptProps) {
  const [value, setValue] = useState("");
  return (
    <div className='prompt-overlay'>
      <div className='prompt-box'>
        <h3 className="prompt-message">{message}</h3>
        <textarea
          className="prompt-input"
          rows={3}                    // gives you 3 text‐lines of height automatically
          placeholder="Type here…"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <div className="prompt-actions">
          <button
            className="prompt-btn prompt-confirm"
            disabled={!value.trim()}
            onClick={() => onConfirm(value)}>
            Send
          </button>
          <button className="prompt-btn prompt-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const navigate = useNavigate();
  
  const navigateToPhotobooth = () => {
    navigate('/photobooth');
  }

  const navigateToPhotostrip = () => {
    navigate('/photostrip');
  }

  // const handleSendFeedback = () => {
  //   const response = window.prompt("Share with us your thoughts!", "");
  //   if (response !== null) {
  //     console.log("Use feedback", response);
  //     alert("Thank you for your feedback!");
  //   }
  // }

  // for feedback
  const [showPrompt, setShowPrompt] = useState(false);
  const handleClickFeedback = () => setShowPrompt(true);
  const handleConfirm = (text: string) => {
    console.log("User feedback", text);
    setShowPrompt(false);
  }
  const handleCancel = () => setShowPrompt(false);

  const url = window.location.href;
  const smsHref = `sms:?&body=${encodeURIComponent(url)}`;

  return (
    <div className="background-container">

      <div className="info-container">
        <div style={{fontFamily: "var(--font-normal)", fontSize: "20px", fontWeight: "500"}}>Share</div>
        <div onClick={handleClickFeedback} style={{fontFamily: "var(--font-normal)", fontSize: "20px", fontWeight: "500"}}>Feedback</div>
      </div>

      {showPrompt && (
        <FeedbackPrompt
          message="Share with us your thoughts!"
          placeholder="Type here…"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

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