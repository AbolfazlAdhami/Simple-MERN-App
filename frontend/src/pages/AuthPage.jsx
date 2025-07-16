import React, { useState, useContext, useCallback } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/validators";
import { useForm } from "../hook/useForm";
import { AuthContext } from "../context/AuthContext";

function AuthPage() {
  const { login } = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { formState, inputHandler, setFormData } = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const switchModeHandler = useCallback(() => {
    if (!isLoginMode) {
      setFormData({ ...formState.state, name: undefined }, formState.inputs.isValid.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((pervState) => !pervState);
  }, [formState, isLoginMode, setFormData]);

  const submitHandler = (event) => {
    event.perventDefault();
    console.log(formState.inputs);
    login();
  };

  return (
    <section className="container flex justify-center items-center my-12 ">
      <div className="md:w-2/5 w-full bg-slate-200 shadow-lg p-4  rounded-lg">
        <h1 className="font-bold text-2xl mb-6">Login Form</h1>
        <form className="flex flex-col" onSubmit={submitHandler}>
          {!isLoginMode && <Input element="input" id="name" type="text" label="Your Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name." onInput={inputHandler} />}
          <Input element="input" id="email" type="email" label="E-Mail" validators={[VALIDATOR_EMAIL()]} errorText="Please enter a valid email address." onInput={inputHandler} />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password, at least 5 characters."
            onInput={inputHandler}
          />
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
