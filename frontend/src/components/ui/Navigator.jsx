import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "./Button";

function Navigator() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <nav className="hidden w-full sm:flex items-center justify-start gap-3">
      <NavLink to={"/"} className={"text-xl font-bold "}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink to={"/place"} className={"text-xl font-bold "}>
          My Places
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to={"/place/new"} className={"text-xl font-bold "}>
          Add New Place
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink to={"/auth"} className={"text-xl font-bold "}>
          Login
        </NavLink>
      )}
      {isLoggedIn && (
        <Button
          onClick={() => logout()}
          className={"bg-slate-50 border border-slate-50 text-slate-950 hover:text-slate-50 hover:bg-transparent transition ease-in duration-200  rounded-lg self-end p-1 px-2 ml-auto"}
        >
          <p className="text-xl font-bold ">Logout</p>
        </Button>
      )}
    </nav>
  );
}

export default Navigator;
