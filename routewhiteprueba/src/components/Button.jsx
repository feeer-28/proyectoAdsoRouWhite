import React from "react";
import "../assets/button.css";

function Button({ children, onClick, type = "button", className = "", ...props }) {
  return (
    <button
      type={type}
      className={`rw-btn ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button; 