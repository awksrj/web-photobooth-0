import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Custom.css";

const bgOptions = [
  { name: "Black", style: { background: "#000" } },
  { name: "Pink", style: { background: "#EDBFD6" } },
    { name: "Lavender", style: { background: "#E6E6FA" } },
  { name: "Sky Blue", style: { background: "#87CEEB" } },
  { name: "Light Green", style: { background: "#D1E8D1" } },
];

const Custom: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const photos: string[] = state?.photos ?? [];
  const comboRef = useRef<HTMLDivElement>(null);

  const [bgStyle, setBgStyle] = useState(bgOptions[0].style);

  return (
    <div className="customize-wrapper">
<div className="customize-left">
  <div className="text">Customize Your Photostrip</div>

  <div className="bg-section">
    <label className="bg-label">Background</label>
    <div className="bg-picker-thumbnails">
      {bgOptions.map((opt) => {
        const isActive = bgStyle === opt.style;
        return (
          <div
            key={opt.name}
            className={`bg-thumb ${isActive ? "active" : ""}`}
            style={opt.style}
            onClick={() => setBgStyle(opt.style)}
          >
            {isActive && <span className="checkmark">✓</span>}
          </div>
        );
      })}
    </div>

    <button className="print-button">Print</button>
  </div>
</div>



      {/* Right side */}
      <div className="customize-right">
        <div ref={comboRef} className="photostrip" style={bgStyle}>
          {photos.map((photo, idx) =>
            photo ? (
              <img
                key={idx}
                src={photo}
                className="result-photo"
                alt={`Captured ${idx}`}
              />
            ) : (
              <div key={idx} className="result-photo placeholder">Empty</div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Custom;
