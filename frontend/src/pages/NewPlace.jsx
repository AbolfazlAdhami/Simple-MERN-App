import React from "react";
import { useForm } from "../hook/useForm";
import { Input, Button } from "../components";
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "../utils/validators";

function NewPlace() {
  const { formState, inputHandler } = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // send this to the backend!
  };

  return (
    <section className="container flex justify-center items-center my-12 ">
      <form className="flex flex-col w-1/2 p-4 shadow-lg rounded-lg bg-slate-200 " onSubmit={placeSubmitHandler}>
        <Input id="title" element="input" type="text" label="Title" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid title." onInput={inputHandler} />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input id="address" element="input" label="Address" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a valid address." onInput={inputHandler} />
        <Button className={"bg-amber-600 hover:bg-amber-400"} type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </section>
  );
}

export default NewPlace;
