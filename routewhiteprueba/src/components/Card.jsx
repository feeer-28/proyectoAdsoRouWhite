import React from "react";
import "../assets/card.css";

function Card({ children, className = "", ...props }) {
  return (
    <div className={`rw-card ${className}`} tabIndex={0} {...props}>
      {children}
    </div>
  );
}

export default Card; 