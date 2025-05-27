import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Custom.css";

const Final: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const photos: string[] = state?.photos ?? [];
  const comboRef = useRef<HTMLDivElement>(null);

  return (
    <div className="big-wrapper">
        <div className="option-wrapper">
            <div className="text">Customi</div>
        </div>

        <div className="demo-wrapper">

        </div>
    </div>
  );
};

export default Final;
