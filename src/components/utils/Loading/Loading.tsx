import React from "react";
import "./styles/Loading.scss";

export const Loading: React.FC = () => {
  return (
    <div className="loader">
      <div className="duo duo1">
        <div className="dot dot-a"></div>
        <div className="dot dot-b"></div>
      </div>
      <div className="duo duo2">
        <div className="dot dot-a"></div>
        <div className="dot dot-b"></div>
      </div>
    </div>
  );
};
