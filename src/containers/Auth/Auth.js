import React from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = (props) => {
  const [isSignup, setIsSignup] = React.useState(true);
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

  React.useEffect(() => {
    if (!props.isBuilding && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedControls = updateObject(controls, {
      [inputIdentifier]: updateObject(controls[inputIdentifier], {
        value: e.target.value,
        valid: checkValidity(
          e.target.value,
          controls[inputIdentifier].validation
        ),
        touched: true,
      }),
    });
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

    setControls(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const formElementsArray = [];
  for (const key in controls) {
    formElementsArray.push({ id: key, config: controls[key] });
  }

  return (
    <div className="Auth">
      {props.isAuthenticated && <Redirect to={props.authRedirectPath} />}
      {props.error && <p>{props.error.message}</p>}
      <form onSubmit={submitHandler}>
        {props.loading ? (
          <Spinner />
        ) : (
          formElementsArray.map((formElement) => (
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
          ))
        )}
        <Button type="Success">SUBMIT</Button>
      </form>
      <Button
        type="Danger"
        clicked={() => {
          setIsSignup(!isSignup);
        }}
      >
        SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    isBuilding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
