import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
  const [ingredients, _] = React.useState({
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1,
  });

  React.useEffect(() => {}, []);

  return (
    <div>
      <CheckoutSummary ingredients={ingredients} />
    </div>
  );
};

export default Checkout;
