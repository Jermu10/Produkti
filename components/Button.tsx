import React from "react";

const Button = ({ children, className }: ButtonProps) => {
  return <button className={` ${className}`}>{children}</button>;
};

export default Button;
