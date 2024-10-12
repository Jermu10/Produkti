"use client";
import React from "react";

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`text-white rounded cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
