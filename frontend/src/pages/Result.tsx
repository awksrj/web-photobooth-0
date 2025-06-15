import React, { useRef, useState, useEffect} from "react";
import "./Result.css";
import "./styles.css"
import { href, useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { ReactComponent as HouseIcon } from "../assets/images/house-solid.svg";
import { jsPDF } from "jspdf";
import { error } from "console";
import printIcon from "../assets/images/print_icon.png"
import { auth } from "../config/firebase";
import { ReactComponent as ShareIcon } from "../assets/images/share-icon.svg";



const Result: React.FC = () => {
  const { state } = useLocation();
  const photos: string[] = state?.photos ?? [];
  const bgStyle = state?.bgStyle ?? { background: "#000" }; // fallback background
  const timestamp = state?.timestamp ?? "";
  const showTimestamp: boolean = state?.showTimestamp ?? false;
  const caption: string = state?.caption ?? "";

  const comboRef = useRef<HTMLDivElement>(null);

  // return home
  const navigate = useNavigate();
  const handleReturnHome = () => {
    navigate("/home");
  };

  // common helper fot download and share
  const generatePDF = async (): Promise<string> => {
    if (!comboRef.current) {
      throw new Error("Nothing to capture");
    }

    const el = comboRef.current;
    const canvas = await html2canvas(el, {
      backgroundColor: null,
      scale: 2,
    })
    return canvas.toDataURL("image/png");
  }

  // download
  const handleDownload = async () => {
    if (!comboRef.current) return;
    try {
      const imageURL = await generatePDF();
      const link = document.createElement("a");
      link.href = imageURL;
      link.download = "yourphotostrip";
      link.click();
    } 
    catch (err) { console.error("Download Failed", err); }
  };

  // share 
  const handleShare = async () => {
    try {
      const dataUrl = await generatePDF();
      const res  = await fetch(dataUrl);
      const blob = await res.blob();

      const file = new File([blob], "youresopretty.png", { type: blob.type });

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          text: "Check this out!",
        });
      } else {
        // fallback: copy a blob:// URL for the user to paste
        const url = URL.createObjectURL(blob);
        await navigator.clipboard.writeText(url);
        alert("Image link copied to clipboard!");
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Share failed", err);
    }
  }

  // account
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setIsAuthenticated(true);
        setAccountName(user.accountName || user.email);
      } catch (error) {
        console.error("Error parsing user data: ", error);
      }
    }
  }, []);

    const handleShowDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setAccountName("");
    setShowDropDown(false);
    navigate("/home");

    auth.signOut().catch(console.error);
    alert("You have been logged out successfully!");
  };

  const handleToSettings = () => { };
  const handleNavigateToGallery = () => { };

  const AccountDropDown = () => (
    <div className='account-dropdown'>
      <div className='dropdown-item' onClick={handleNavigateToGallery}>My Gallery</div>
      <div className='dropdown-item' onClick={handleToSettings}>Settings</div>
      <div className='dropdown-item' onClick={handleLogOut}>Log Out</div>
    </div>
  );


  return (
    <div className="result-wrapper">
      {/* home button */}
      <div style={{display: "flex", top: "20px", left: "16px", gap: "5px", alignItems: "center", position: "absolute"}}>
        <button onClick={handleReturnHome} 
                style={{background: "transparent", border: "none", cursor: "pointer"}}> 
          <HouseIcon width={35} height={35} style={{ fill: "var(--color-pink)" }} />
        </button>

      </div>

      {/*account*/ }
      <div className="info-container">
        <button onClick={handleShare} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
          <ShareIcon className='share-icon' width={30} height={30} />
        </button>
        <span className="auth-text" onClick={isAuthenticated ? handleShowDropDown : () => navigate('/home')}>
          {isAuthenticated ? accountName : "Log In"}
        </span>
        {isAuthenticated && showDropDown && <AccountDropDown />}
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

            photo ? ( <img key={index} src={photo} alt={`Captured ${index}`} className="individual-photo" />) 
                  : (<div key={index} className="individual-photo placeholder">Empty</div>))}

        {(caption || showTimestamp) && (
          <div className="footer-section">
            {caption && <div className="caption-display">{caption}</div>}
            {showTimestamp && <div className="timestamp">{timestamp}</div>}
          </div>
        )}
          </div>
          
        </div>
        {/* share, download button */}
        <div className = "result-actions">
            <button onClick={handleDownload}>Download</button>
            <button onClick={handleShare}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default Result;