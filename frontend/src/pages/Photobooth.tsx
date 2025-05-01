import React, { useEffect, useRef, useState } from "react";
import "./Photobooth.css";
import Result from "./Result"; // ✅ Import Result

const Photobooth: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false); // ✅ Add this

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const startCaptureSequence = async () => {
    if (isCapturing) return;
    setIsCapturing(true);

    for (let i = 0; i < 3; i++) {
      await runCountdown();
      await takePhotoAtIndex(i);
      await delay(1000);
    }

    setIsCapturing(false);
    setShowResult(true); // ✅ Show Result view
  };

  const runCountdown = async () => {
    for (let i = 3; i > 0; i--) {
      setCountdown(i);
      await delay(1000);
    }
    setCountdown(null);
  };

  const takePhotoAtIndex = async (index: number) => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");

        setPhotos((prevPhotos) => {
          const updatedPhotos = [...prevPhotos];
          updatedPhotos[index] = dataUrl;
          return updatedPhotos;
        });
      }
    }
  };

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleRetake = () => {
    setPhotos([null, null, null]);
    setShowResult(false);
  };

  // ✅ Show Result if finished
  if (showResult) {
    return <Result photos={photos as string[]} onRetake={handleRetake} />;
  }

  return (
    <div className="photobooth-wrapper">
      <div className="photobooth-container">
        <div className="photo-strip">
          {photos.map((photo, index) => (
            <div key={index} className="photo-placeholder">
              {photo ? (
                <img src={photo} alt={`Captured ${index}`} className="photo-preview" />
              ) : (
                <div className="photo-placeholder-empty" />
              )}
            </div>
          ))}
        </div>

        <div className="camera-area">
          <div className="camera-wrapper">
            {countdown !== null && (
              <div className="countdown-overlay">{countdown}</div>
            )}
            <video ref={videoRef} autoPlay playsInline className="camera" />
          </div>
          <button
            className="capture-button"
            onClick={startCaptureSequence}
            disabled={isCapturing}
          >
            {isCapturing ? "Capturing..." : "Start"}
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden-canvas" />
      </div>
    </div>
  );
};

export default Photobooth;
