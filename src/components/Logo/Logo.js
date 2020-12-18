import React from "react";
import "./Logo.css";
import burgerLogo from "../../assets/images/burger-logo.png";

const Logo = () => {
  return (
    <div className="Logo">
      <img src={burgerLogo} alt="My Burger" />
    </div>
  );
};

export default Logo;
