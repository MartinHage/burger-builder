import React from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";

import "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
const ContactData = (props) => {
  const [orderForm, setOrderForm] = React.useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zipcode",
      },
      value: "",
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.price,
    };
    axios
      .post("/orders.json", order)
      .then(() => {
        setIsLoading(false);
        props.history.push("/");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = { ...orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = e.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    setOrderForm(updatedOrderForm);
  };

  const formElementsArray = [];
  for (const key in orderForm) {
    formElementsArray.push({ id: key, config: orderForm[key] });
  }

  return (
    <div className="ContactData">
      <h4>Enter your Contact Data</h4>{" "}
      {isLoading ? (
        <Spinner />
      ) : (
        <form>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(e) => {
                inputChangedHandler(e, formElement.id);
              }}
            />
          ))}
          <Button type="Success" clicked={orderHandler}>
            ORDER
          </Button>
        </form>
      )}
    </div>
  );
};

export default ContactData;
