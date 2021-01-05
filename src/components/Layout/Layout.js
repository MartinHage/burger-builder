import React from "react";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import "./Layout.css";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = React.useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };
  const sideDrawerOpenHandler = () => {
    setShowSideDrawer(true);
  };

  return (
    <>
      <Toolbar open={sideDrawerOpenHandler} />
      <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
      <main className="Content">{props.children}</main>
    </>
  );
};

export default Layout;
