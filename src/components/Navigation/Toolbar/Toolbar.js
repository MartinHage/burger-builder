import React from "react";
import Logo from "../../Logo/Logo";
import "./Toolbar.css";

const Toolbar = (props) => {
  return (
    <header className="Toolbar">
      <div>MENU</div>
      <Logo />
      <nav>...</nav>
    </header>
  );
};

export default Toolbar;
