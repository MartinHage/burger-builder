import React from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = (props) => {
  const [ingredients, setIngredient] = React.useState({});
  const [totalPrice, setTotalPrice] = React.useState(0);
  React.useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const queryIngredients = {};
    let price = 0;
    for (const param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        queryIngredients[param[0]] = +param[1];
      }
    }
    setIngredient(queryIngredients);
    setTotalPrice(price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        render={(props) => (
          <ContactData
            ingredients={ingredients}
            price={totalPrice}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default Checkout;
