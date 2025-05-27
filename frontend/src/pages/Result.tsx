import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Result.css";

const Result: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const photos: string[] = state?.photos ?? [];
  const comboRef = useRef<HTMLDivElement>(null);

  const handleRetake = () => {
    navigate("/photobooth");
  };

  const handleDownload = async () => {
    if (!comboRef.current) return;
    try {
      const canvas = await html2canvas(comboRef.current, {
        backgroundColor: null,
        scale: 2
      })
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "photostrip.png";
      link.click();
    }
    catch (err) {
      console.error("Download failed", err);
    }
  }

  return (
    <div className="result-wrapper">
      <div className="result-container">
        {/* Black photostrip “combo” */}
        <div ref = {comboRef} className="photostrip-combo">
          {photos.map((photo, index) =>
            photo ? (
              <img
                key={index}
                src={photo}
                alt={`Captured ${index}`}
                className="result-photo"
              />
            ) : (
              <div key={index} className="result-photo placeholder">
                Empty
              </div>
            )
          )}
        </div>
      </div>
      <div className = "result-actions">
          <button onClick={handleDownload}>Download</button>
          <button onClick={handleRetake}>Retake</button>
        </div>
    </div>
  );
};

export default Result;
