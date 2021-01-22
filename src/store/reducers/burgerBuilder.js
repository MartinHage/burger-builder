import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredients = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  });
  return updateObject(state, {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
};

const removeIngredient = (state, action) => {
  const updatedIng = updateObject(state.ingredients, {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  });
  return updateObject(state, {
    ingredients: updatedIng,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  });
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngredientFailed = (state, action) => {
  return updateObject(state, {
    error: true,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENT:
      return setIngredient(state, action);

    case actionTypes.FETCH_INGREDIENT_FAILED:
      return fetchIngredientFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
