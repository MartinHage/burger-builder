import React from "react";
import axios from "../../axios-orders";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

const BurgerBuilder = () => {
  const [ingredients, setIngredients] = React.useState({
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  });
  const [totalPrice, setTotalPrice] = React.useState(4);
  const [canOrder, setCanOrder] = React.useState(false);
  const [purchasing, setPurchasing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const updateCanOrderState = (updatedIngredients) => {
    const sum = Object.keys(updatedIngredients)
      .map((igKey) => {
        return updatedIngredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    setCanOrder(sum > 0);
  };

  const addIngredient = (type) => {
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = ingredients[type] + 1;
    setTotalPrice(totalPrice + INGREDIENT_PRICES[type]);
    setIngredients(updatedIngredients);
    updateCanOrderState(updatedIngredients);
  };

  const removeIngredient = (type) => {
    const updatedIngredients = {
      ...ingredients,
    };
    if (ingredients[type] > 0) {
      updatedIngredients[type] = ingredients[type] - 1;
      setTotalPrice(totalPrice - INGREDIENT_PRICES[type]);
      setIngredients(updatedIngredients);
    }
    updateCanOrderState(updatedIngredients);
  };

  const purchaseContinueHandler = () => {
    //alert("You continue!");
    setIsLoading(true);
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      customer: {
        name: "Kevin Gran",
        address: {
          street: "Teststreet 1",
          zipCode: "14248",
          country: "Sweden",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then(() => {
        setIsLoading(false);
        setPurchasing(false);
      })
      .catch(() => {
        setIsLoading(false);
        setPurchasing(false);
      });
  };

  const disabledInfo = {
    ...ingredients,
  };
  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  let orderSummary = (
    <OrderSummary
      ingredients={ingredients}
      price={totalPrice}
      purchaseCanceled={() => setPurchasing(false)}
      purchaseContinued={purchaseContinueHandler}
    />
  );
  if (isLoading) {
    orderSummary = <Spinner />;
  }
  return (
    <>
      <Modal show={purchasing} modalClosed={() => setPurchasing(false)}>
        {orderSummary}
      </Modal>
      <Burger ingredients={ingredients} />
      <BuildControls
        ingredientAdded={addIngredient}
        ingredientRemoved={removeIngredient}
        disabled={disabledInfo}
        price={totalPrice}
        canOrder={canOrder}
        setPurchasing={setPurchasing}
      />
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
