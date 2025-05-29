import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Result.css";
import "./styles.css"
import printIcon from "../assets/images/print_icon.png"
import { ReactComponent as HouseIcon } from "../assets/images/house-solid.svg";

const Result: React.FC = () => {
  const { state } = useLocation();

  const photos: string[] = state?.photos ?? [];
  const bgStyle = state?.bgStyle ?? { background: "#000" }; // fallback background
  const timestamp = state?.timestamp ?? "";
  const showTimestamp: boolean = state?.showTimestamp ?? false;

  const comboRef = useRef<HTMLImageElement>(null);

  // return home
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/home");
  };

  // download
  const handleDownload = async () => {
    if (!comboRef.current) return;
    try {
      const canvas = await html2canvas(comboRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "photostrip.png";
      link.click();
    } 
    catch (err) { console.error("Download Failed", err); }
  };

  // sharing 
  const url = window.location.href;
  const smsHref = `sms:?&body=${encodeURIComponent(url)}`;

  return (
    <div className="result-wrapper">
      {/* home button */}
      <div style={{display: "flex", top: "20px", left: "16px", gap: "5px", alignItems: "center", position: "absolute"}}>
        <button onClick={handleReturnHome} 
                style={{background: "transparent", border: "none", cursor: "pointer"}}> 
          <HouseIcon
            width={35}
            height={35}
            style={{ fill: "var(--color-pink)" }}
          />
        </button>
      </div>

      <div className="main-content-wrapper">
        {/* text */}
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
          <img src={printIcon} alt="Print Icon" style={{width: "40px", height: "40px", marginTop: "-10px", transform: "rotate(-10deg)"}}/>
          <div style={{ fontFamily: "title font", fontSize: "40px", marginBottom: "10px" }}>Printing ...</div>
        </div>
        {/* photobooth box */}
        <div className="result-container">
          <div ref={comboRef} className="photostrip-combo" style={bgStyle} >
          {photos.map((photo, index) =>
            photo ? (
              <img
                key={index}
                src={photo}
                alt={`Captured ${index}`}
                className="individual-photo"
              />
            ) : (<div key={index} className="individual-photo placeholder">Empty</div>))}
          {showTimestamp && (
            <div className="timestamp">{timestamp}</div>
          )}
          </div>
        </div>
        {/* share, download button */}
        <div className = "result-actions">
            <button onClick={handleDownload}>Download</button>
            <a href={smsHref} style={{ textDecoration: "none" }}>
              <button> Share</button>
            </a>
        </div>
      </div>
    </div>
  );
};

export default Result;