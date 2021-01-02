import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./Toolbar.css";

const Toolbar = (props) => {
  return (
    <header className="Toolbar">
      <div>MENU</div>
      <div className="Toolbar-Logo">
        <Logo />
      </div>
      <NavigationItems />
    </header>
  );
};

export default Toolbar;
