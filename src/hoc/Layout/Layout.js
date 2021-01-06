import React from "react";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
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
