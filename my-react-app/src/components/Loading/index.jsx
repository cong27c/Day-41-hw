import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <>
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p className="loading-text">Đang tải...</p>
      </div>
    </>
  );
};

export default Loading;
