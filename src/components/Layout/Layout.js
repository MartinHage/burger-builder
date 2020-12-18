import React from "react";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import "./Layout.css";

const Layout = (props) => (
  <>
    <Toolbar />
    <SideDrawer />
    <main className="Content">{props.children}</main>
  </>
);

export default Layout;
