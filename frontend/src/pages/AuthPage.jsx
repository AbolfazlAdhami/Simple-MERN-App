import { useState, useContext } from "react";
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
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
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
    setIsLoginMode((prevMode) => !prevMode);
  };

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

          <Button type="submit" className={"bg-sky-400 text-white hover:bg-sky-800"} disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>

          <Button type={"button"} className={"bg-amber-600 hover:bg-amber-400"} onClick={switchModeHandler}>
            SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
          </Button>
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
