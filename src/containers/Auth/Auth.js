import React from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

const Auth = (props) => {
  const [controls, setControls] = React.useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

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
    if (rules.isEmail) {
      const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedControls = {
      ...controls,
    };
    const updatedFormElement = {
      ...updatedControls[inputIdentifier],
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedControls[inputIdentifier] = updatedFormElement;

    /*
    let formValid = true;
    for (const inputIdentifier in updatedControls) {
      formValid = updatedControls[inputIdentifier].valid && formValid;
    }
    setFormIsValid(formValid);
    */
    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value);
  };

  const formElementsArray = [];
  for (const key in controls) {
    formElementsArray.push({ id: key, config: controls[key] });
  }
  return (
    <div className="Auth">
      <form onSubmit={submitHandler}>
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
        <Button type="Success">SUBMIT</Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  };
};

export default connect(null, mapDispatchToProps)(Auth);
