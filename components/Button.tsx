"use client";
import React from "react";

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={` ${className}`}>
      {children}
    </button>
  );
};

export default Button;
