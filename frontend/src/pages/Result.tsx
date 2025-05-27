import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Result.css";
import "./styles.css"
import printIcon from "../assets/images/print_icon.png"
import { ReactComponent as HouseIcon } from "../assets/images/house-solid.svg";


const Result: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const photos: string[] = state?.photos ?? [];
  const bgStyle = state?.bgStyle ?? { background: "#000" }; // fallback background

  const comboRef = useRef<HTMLDivElement>(null);

  const handleReturnHome = () => {
    navigate("/home");
  };

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

      {/* main content */}
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
        <img src={printIcon} alt="Print Icon" style={{width: "40px", height: "40px", marginTop: "-10px", transform: "rotate(-10deg)"}}/>
        <div style={{ fontFamily: "title font", fontSize: "40px", marginBottom: "10px" }}>Printing ...</div>
      </div>

      <div className="result-container">
        {/* Dynamic background applied */}
        <div
          ref={comboRef}
          className="photostrip-combo"
          style={bgStyle}
        >
          {photos.map((photo, index) =>
            photo ? (
              <img
                key={index}
                src={photo}
                alt={`Captured ${index}`}
                className="result-photo"
              />
            ) : (<div key={index} className="result-photo placeholder">Empty</div>)
          )}
        </div>
      </div>
      <div className = "result-actions">
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleReturnHome}>Share</button>
        </div>
    </div>
  );
};

export default Result;