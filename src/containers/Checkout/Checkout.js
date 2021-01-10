import React from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const [ingredients, setIngredient] = React.useState({
    salad: 0,
    meat: 0,
    cheese: 0,
    bacon: 0,
  });

  React.useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const queryIngredients = {};
    for (const param of query.entries()) {
      queryIngredients[param[0]] = +param[1];
    }
    setIngredient(queryIngredients);
  }, []);

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };
  const checkoutContinuedHandler = () => {
    props.history.replace(`checkout/contact-data`);
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
      <Route
        path={`${props.match.path}/contact-data`}
        component={ContactData}
      />
    </div>
  );
};

export default Checkout;
