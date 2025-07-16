import React from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function AuthPage() {
  return (
    <section className="container flex justify-center items-center my-12 ">
      <div className="md:w-2/5 w-full bg-slate-700 p-4 flex items-center justify-between rounded-lg">
        <h1 className="font-bold text-xl">Login Form</h1>
        <form>
          <Input />
          <Button />
        </form>
      </div>
    </section>
  );
}

export default AuthPage;
