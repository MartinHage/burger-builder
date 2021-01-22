import React from "react";
import { connect } from "react-redux";
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
      <Toolbar open={sideDrawerOpenHandler} isAuth={props.isAuthenticated} />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}
      />
      <main className="Content">{props.children}</main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
