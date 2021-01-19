import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };
  const checkoutContinuedHandler = () => {
    props.history.replace(`checkout/contact-data`);
  };
  return (
    <>
      {props.ings ? (
        <div>
          <CheckoutSummary
            ingredients={props.ings}
            checkoutCancelled={checkoutCancelledHandler}
            checkoutContinued={checkoutContinuedHandler}
          />
          <Route
            path={`${props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
