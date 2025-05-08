// Result.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Result.css";

const Result: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const photos: string[] = state?.photos ?? [];

  const handleRetake = () => {
    navigate("/photobooth");
  };

  return (
    <div className="result-wrapper">
      <div className="result-container">
        {/* Black photostrip “combo” */}
        <div className="photostrip-combo">
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
    </div>
  );
};

export default Result;
