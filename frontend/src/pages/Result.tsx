import React from "react";
import "./Result.css";

interface ResultProps {
  photos: (string | null)[];
  onRetake: () => void;
}

const Result: React.FC<ResultProps> = ({ photos }) => {
  return (
    <div className="result-wrapper">
      <div className="result-strip">
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
  );
};

export default Result;
