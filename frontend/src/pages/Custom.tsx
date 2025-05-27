import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Custom.css";

// goal: 5 backgrounds
const bgOptions = [
    { name: "Black", style: { background: "#000"} },
    { name: "Pink", style: { background: "#EDBFD6"} },
]

const Custom: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const photos: string[] = state?.photos ?? [];
  const comboRef = useRef<HTMLDivElement>(null);

  const [bgStyle, setBgStyle] = useState(bgOptions[0].style);

  return (
    <div className="big-wrapper"> 
        <div className="edit-wrapper">
            <div className="option-wrapper">
                <div className="text">Customize Your Photostrip</div>
                <div className="option-group">
                    <label>Background</label>
                    <div className="bg-picker-thumbnails">
                        {bgOptions.map((opt, i) => {
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
                </div>
            </div>
            
            <div className="demo-wrapper">
                <div ref={comboRef} className="photostrip" style={bgStyle}>
                    {photos.map((photo, idx) => photo ? (
                        <img
                            key={idx}
                            src={photo}
                            className="result-photo"
                            alt={`Captured ${idx}`}
                        />) : (
                    <div key={idx} className="result-photo placeholder">
                        Empty
                    </div>
                    )
                )}
                </div>
            </div>
        </div>


        <button className="print-button">Print
        </button>
    </div>
  );
};

export default Custom;
