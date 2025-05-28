import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Result.css";
import "./styles.css"
import printIcon from "../assets/images/print_icon.png"

const Result: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const photos: string[] = state?.photos ?? [];
  const bgStyle = state?.bgStyle ?? { background: "#000" }; // fallback background
  const timestamp = state?.timestamp ?? "";

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
      <div style={{display: "flex", top: "16px", left: "16px", gap: "5px", alignItems: "center", position: "absolute"}}>
        <img src="" alt="Return Home" />
        <button onClick={handleReturnHome} style={{background: "transparent", border: "none",
            cursor: "pointer",
            color: "var(--color-maroon);",
            fontSize: "16px", 
            fontFamily: "var(--font-normal)"}}>Return Home</button>
      </div>

      <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
        <img src={printIcon} alt="Print Icon" style={{width: "40px", height: "40px", marginTop: "-10px", transform: "rotate(-10deg)"}}/>
        <div style={{ fontFamily: "title font", fontSize: "40px", marginBottom: "10px" }}>Printing Photostrip ...</div>
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
                  <div className="timestamp">{timestamp}</div>
        </div>
      </div>
      <div className = "result-actions">
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleReturnHome}>Home</button>
        </div>
    </div>
  );
};

export default Result;