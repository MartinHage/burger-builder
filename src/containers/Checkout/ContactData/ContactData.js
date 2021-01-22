import React from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axios-orders";

import "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";

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
      errorMessage: "Please enter a valid name",
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
      errorMessage: "Please enter a valid street",
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
      errorMessage: "Please enter a zipcode of 5 characters",
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
      errorMessage: "Please enter a valid country",
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
      errorMessage: "Please enter a valid email",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    },
  });
  const [formIsValid, setFormIsValid] = React.useState(false);

  const orderHandler = (e) => {
    e.preventDefault();
    const formData = {};
    for (const formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
    };
    props.onOrderBurger(order, props.token);
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

    let formValid = true;
    for (const inputIdentifier in updatedOrderForm) {
      formValid = updatedOrderForm[inputIdentifier].valid && formValid;
    }
    setFormIsValid(formValid);
    setOrderForm(updatedOrderForm);
  };

  const formElementsArray = [];
  for (const key in orderForm) {
    formElementsArray.push({ id: key, config: orderForm[key] });
  }

  return (
    <div className="ContactData">
      <h4>Enter your Contact Data</h4>{" "}
      {props.isLoading ? (
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
              errorMessage={formElement.config.errorMessage}
              changed={(e) => {
                inputChangedHandler(e, formElement.id);
              }}
            />
          ))}
          <Button type="Success" disabled={!formIsValid}>
            ORDER
          </Button>
        </form>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    isLoading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
