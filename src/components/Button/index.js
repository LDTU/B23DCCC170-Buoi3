import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  size = "medium",
  style,
}) => {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${disabled ? "" : className} ${size}`}
    >
      {children}
    </button>
  );
};

export default Button;
