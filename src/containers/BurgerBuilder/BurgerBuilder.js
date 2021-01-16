import React from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  /*
  React.useEffect(() => {
    axios
      .get("ingredients.json")
      .then((res) => {
        setIngredients(res.data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);
  */

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
    props.history.push("/checkout");
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
  if (isLoading) {
    orderSummary = <Spinner />;
  }

  let burger = error ? <p>Ingredients can not be loaded!</p> : <Spinner />;
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
          setPurchasing={setPurchasing}
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
    ings: state.ingredients,
    price: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
