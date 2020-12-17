import React from "react";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        Total price: <strong>{props.price}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button type="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button type="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </>
  );
};

export default OrderSummary;
