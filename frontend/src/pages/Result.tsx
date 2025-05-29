import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Result.css";
import "./styles.css"
import printIcon from "../assets/images/print_icon.png"
import { ReactComponent as HouseIcon } from "../assets/images/house-solid.svg";
import { jsPDF } from "jspdf";
import { error } from "console";

const Result: React.FC = () => {
  const { state } = useLocation();
  const photostripImage: string = state?.photostripImage ?? "";

  const photos: string[] = state?.photos ?? [];
  const bgStyle = state?.bgStyle ?? { background: "#000" }; // fallback background
  const timestamp = state?.timestamp ?? "";

  const comboRef = useRef<HTMLImageElement>(null);

  // return home
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/home");
  };

  const generatePDF = async (): Promise<File> => {
    if (!comboRef.current) {
      throw new Error("Nothing to capture");
    }

    const el = comboRef.current;
    const { width, height } = comboRef.current.getBoundingClientRect();

    const canvas = await html2canvas(el, {
      backgroundColor: null,
      scale: 2,
      width,
      height,
    })
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

    // 3) Export to Blob → File
    const blob = pdf.output("blob");
    return new File([blob], `photostrip_${Date.now()}.pdf`, {
      type: "application/pdf",
    });
  }

  // download
  const handleDownload = async () => {
    if (!comboRef.current) return;
    try {
      const pdfFile = await generatePDF();
      const url = URL.createObjectURL(pdfFile);
      const link = document.createElement("a");
      link.href = url;
      link.download = pdfFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } 
    catch (err) { console.error("Download Failed", err); }
  };

  // share 
  const handleShare = async () => {
    try {
      const pdfFile = await generatePDF();
      if (navigator.canShare?.({ files: [pdfFile] })) {
        await navigator.share({
          files: [pdfFile],
          title: "My Photostrip",
          text: "Check out my photostrip!",
        });
      } else {
        // Fallback: copy link to clipboard or alert
        const url = URL.createObjectURL(pdfFile);
        await navigator.clipboard.writeText(url);
        alert("PDF link copied to clipboard!");
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  }

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
            <div className="timestamp">{timestamp}</div>
          </div>
        </div>
        {/* share, download button */}
        <div className = "result-actions">
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleShare} style={{background: "transparent", border: "none", cursor: "pointer"}}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Result;