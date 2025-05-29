import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Custom.css";
import html2canvas from "html2canvas";

export const bgOptions = [
  { name: "Black", style: { background: "#000" } },
  { name: "Pink", style: { background: "#f5cac3" } },
  { name: "Green", style: { background: "#717744" } },
  { name: "Beige", style: { background: "#d5bdaf" } },
  { name: "Red", style: { background: "#90323d" } },
];

const filterOptions = [
  { name: "None", style: "none", backgroundColor: "#e0e0e0" },
  { name: "B&W", style: "grayscale(100%)", backgroundColor: "linear-gradient(to right, black 50%, white 50%)"   },
    { name: "Vivid", style: "contrast(120%) saturate(150%)", backgroundColor: "#dbb42c" },
];

const Custom: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const photos: string[] = state?.photos ?? [];
  const comboRef = useRef<HTMLDivElement>(null);

  const [bgStyle, setBgStyle] = useState(bgOptions[0].style);
  const [filterStyle, setFilterStyle] = useState("none");
  const [showTimestamp, setShowTimestamp] = useState(true);

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
    const el = comboRef.current;

    await Promise.all(
    Array.from(el.querySelectorAll("img")).map((img: HTMLImageElement) =>
      img.complete
        ? Promise.resolve()
        : new Promise((res) => { img.onload = img.onerror = () => res(null); })
    )
  );


    const {width, height} = el.getBoundingClientRect();
    try {
      const canvas = await html2canvas(el, {
        backgroundColor: null,
        scale: (window.devicePixelRatio || 1) * 3,
        width,
        height,
      });
      const dataUrl = canvas.toDataURL("image/png");

      // const link = document.createElement("a");
      // link.href = dataUrl;
      // link.download = `photostrip_${Date.now()}.png`;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);

      // const ctx = canvas.getContext("2d");
      // if (ctx) {
      //   ctx.imageSmoothingEnabled = true;
      //   ctx.imageSmoothingQuality = "high";
      // }

      // navigate("/result", {
      //   state: { photostripImage: dataUrl, timestamp, },
      // });
      canvas.toBlob((blob) => {
    if (!blob) return console.error("No blob produced");
    const file = new File([blob], `photostrip-${Date.now()}.png`, {
      type: "image/png",
    });

    // navigate, passing the File
    navigate("/result", {
      state: { photostripFile: file, timestamp },
    });
  }, "image/png");
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
        </div>


        <div className="filter-section">
          <label className="bg-label">Filter</label>
          <div className="bg-picker-thumbnails">
            {filterOptions.map((opt) => {
              const isActive = filterStyle === opt.style;
              const isBW = opt.name === "Black & White";
              return (
                <div
                  key={opt.name}
                  className={`bg-thumb ${isActive ? "active" : ""} ${isBW ? "bw-thumb" : ""}`}
                  style={{
                    background: opt.backgroundColor,
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: opt.backgroundColor
                  }}
                  onClick={() => setFilterStyle(opt.style)}
                >
                                    {isActive && <span className="checkmark">✓</span>}
                </div>
              );
            })}
          </div>

          <button className="print-button" onClick={() => navigate("/result", { state: { photos, bgStyle, timestamp } })}> Print </button>

        </div>
            
        <div className="toggle-section">
          <label className="bg-label">Timestamp</label>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showTimestamp}
              onChange={() => setShowTimestamp(!showTimestamp)}
          />
          <span className="toggle-slider" />
          </label>
        </div>


        <button className="print-button" onClick={handlePrint}>
          Print
        </button>
      </div>

      {/* Right Side */}
      <div className="customize-right">
        <div ref={comboRef} className="photostrip" style={bgStyle}>
          {photos.map((photo, idx) =>
            photo ? (

              <img
                key={idx}
                src={photo}
                className="result-photo"
                alt={`Captured ${idx}`}
                style={{ filter: filterStyle }}
              />

              <div className="result-photo" style={{ backgroundImage: `url(${photo})` }}>
                {/* <img key={idx} src={photo} alt={`Captured ${idx}`} /> */}
              </div>

            ) : (
              <div key={idx} className="result-photo placeholder">
                Empty
              </div>
            )
          )}
          {showTimestamp && (<div className="timestamp">{timestamp}</div>)}

        </div>
      </div>
    </div>
  );
};

export default Custom;
