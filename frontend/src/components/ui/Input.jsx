import React, { useEffect, useReducer } from "react";
import { validate } from "../../utils/validators";

const inputeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({ type, initialValue, initialValid }) => {
  const [inputeState, dispatch] = useReducer(inputeReducer, {
    value: initialValue || "",
    isTouched: false,
    isValid: initialValid || false,
  });

  return <div className=""></div>;
};

export default Input;
