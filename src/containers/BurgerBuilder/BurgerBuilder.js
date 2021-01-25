import React from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = React.useState(false);

  React.useEffect(() => {
    props.onInitIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };

  const disabledInfo = {
    ...props.ings,
  };
  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = null;

  if (props.ings) {
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        price={props.price}
        purchaseCanceled={() => setPurchasing(false)}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  let burger = props.error ? (
    <p>Ingredients can not be loaded!</p>
  ) : (
    <Spinner />
  );
  if (props.ings) {
    burger = (
      <>
        <Burger ingredients={props.ings} />{" "}
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          canOrder={updatePurchaseState(props.ings)}
          isAuth={props.isAuthenticated}
          purchaseHandler={purchaseHandler}
        />
      </>
    );
  }
  return (
    <>
      <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
