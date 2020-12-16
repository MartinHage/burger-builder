import React from "react";
import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
];

const BuildControls = (props) => {
  return (
    <div className="BuildControls">
      <strong>Current Price: {props.price.toFixed(2)}</strong>
      {controls.map((ctrl) => (
        <BuildControl
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          key={ctrl.label}
          label={ctrl.label}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
    </div>
  );
};

export default BuildControls;
