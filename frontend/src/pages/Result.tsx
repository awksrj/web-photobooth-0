import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Result.css";
import "./styles.css"
import printIcon from "../assets/images/print_icon.png"

const Result: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const photostripImage: string = state?.photostripImage ?? "";


  const comboRef = useRef<HTMLImageElement>(null);


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
            {photostripImage ? (
        <img
          ref={comboRef}
          src={photostripImage}
          alt="Photostrip Result"
          className="result-photo-final"
  />
) : (
  <p>No photostrip image available.</p>
)}

      </div>
      <div className = "result-actions">
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleReturnHome}>Home</button>
        </div>
    </div>
  );
};

export default Result;