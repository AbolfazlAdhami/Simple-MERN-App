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

const Input = ({ type, initialValue, initialValid, id, label, onInput, errorText, validators, ...props }) => {
  const [inputState, dispatch] = useReducer(inputeReducer, {
    value: initialValue || "",
    isTouched: false,
    isValid: initialValid || false,
  });

  const { value, isValid } = inputState;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    const { target } = event;
    dispatch({
      type: "CHNAGE",
      value: target.value,
      isValid: validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && "form-control--invalid"}`}>
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea {...props} rows={props.rows || 3} onChange={changeHandler} onBlur={touchHandler} value={inputState.value} />
      ) : (
        <input id={id} type={type} placeholder={props.placeholder} onChange={changeHandler} onBlur={touchHandler} value={inputState.value} />
      )}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
