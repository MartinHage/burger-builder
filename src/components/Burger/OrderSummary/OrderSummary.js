import React from "react";

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map(
    (igKey, index) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {props.ingredients[igKey]}
        </li>
      );
    }
  );
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>Continue to Checkout?</p>
    </>
  );
};

export default OrderSummary;
