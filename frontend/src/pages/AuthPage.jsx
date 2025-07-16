import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../utils/validators";

function AuthPage() {
  return (
    <section className="container flex justify-center items-center my-12 ">
      <div className="md:w-2/5 w-full bg-slate-200 shadow-lg p-4  rounded-lg">
        <h1 className="font-bold text-2xl mb-6">Login Form</h1>
        <form className="flex flex-col">
          {/* <Input /> */}
          <Button />
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
