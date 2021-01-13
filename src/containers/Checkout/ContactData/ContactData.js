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
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zipcode",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
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
    const formData = {};
    for (const formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
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

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
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
        <form onSubmit={orderHandler}>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(e) => {
                inputChangedHandler(e, formElement.id);
              }}
            />
          ))}
          <Button type="Success">ORDER</Button>
        </form>
      )}
    </div>
  );
};

export default ContactData;
