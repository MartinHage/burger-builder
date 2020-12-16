import React from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";

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

  const addIngredient = (type) => {
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = ingredients[type] + 1;
    setTotalPrice(totalPrice + INGREDIENT_PRICES[type]);
    setIngredients(updatedIngredients);
  };

  const removeIngredient = (type) => {
    const updatedIngredients = {
      ...ingredients,
    };
    if (ingredients[type] > 0) {
      updatedIngredients[type] = ingredients[type] - 1;
      setTotalPrice(INGREDIENT_PRICES[type] - totalPrice);
      setIngredients(updatedIngredients);
    }
  };

  const disabledInfo = {
    ...ingredients,
  };
  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  return (
    <>
      <Burger ingredients={ingredients} />
      <BuildControls
        ingredientAdded={addIngredient}
        ingredientRemoved={removeIngredient}
        disabled={disabledInfo}
        price={totalPrice}
      />
    </>
  );
};

export default BurgerBuilder;
