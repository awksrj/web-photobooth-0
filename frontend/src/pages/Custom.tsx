import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Custom.css";
import html2canvas from "html2canvas";

const bgOptions = [
  { name: "Black", style: { background: "#000" } },
  { name: "Pink", style: { background: "#f5cac3" } },
  { name: "Green", style: { background: "#717744" } },
  { name: "Beige", style: { background: "#d5bdaf" } },
  { name: "Red", style: { background: "#90323d" } },
];

const Custom: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const photos: string[] = state?.photos ?? [];
  const comboRef = useRef<HTMLDivElement>(null);

  const [bgStyle, setBgStyle] = useState(bgOptions[0].style);

  const getFormattedDate = (): string => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const year = now.getFullYear();
    return `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;
  };

  const timestamp = getFormattedDate();

  const handlePrint = async () => {
    if (!comboRef.current) return;

    try {
      const canvas = await html2canvas(comboRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      const dataUrl = canvas.toDataURL("image/png");

      navigate("/result", {
        state: {
          photostripImage: dataUrl,
          timestamp,
        },
      });
    } catch (err) {
      console.error("Failed to generate photostrip image", err);
    }
  };

  return (
    <div className="customize-wrapper">
      {/* Left side */}
      <div className="customize-left">
        <div className="text">Decorate ♥</div>

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

          <button className="print-button" onClick={handlePrint}>
            Print
          </button>
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
              <div key={idx} className="result-photo placeholder">
                Empty
              </div>
            )
          )}
          <div className="timestamp">{timestamp}</div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
