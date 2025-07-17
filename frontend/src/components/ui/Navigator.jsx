import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Button from "./Button";

function Navigator() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <nav className="hidden w-full sm:flex items-center justify-start gap-3">
      <NavLink to={"/"} className={"text-xl hover:border-b-slate-50 hover:border-b transition-all duration-75 ease-in font-bold "}>
        All Users
      </NavLink>
      {isLoggedIn && (
        <NavLink to={"/u1/places"} className={"text-xl hover:border-b-slate-50 hover:border-b transition-all duration-75 ease-in font-bold "}>
          My Places
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink to={"/places/new"} className={"text-xl hover:border-b-slate-50 hover:border-b transition-all duration-75 ease-in font-bold "}>
          Add Place
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink to={"/auth"} className={"text-xl hover:border-b-slate-50 hover:border-b transition-all duration-75 ease-in font-bold "}>
          Login
        </NavLink>
      )}
      {isLoggedIn && (
        <Button
          onClick={() => logout()}
          className={"bg-slate-950 border border-slate-950 text-slate-950 hover:text-slate-950 hover:bg-transparent transition ease-in duration-200  rounded-lg self-end p-1 px-2 ml-auto"}
        >
          <p className="text-xl font-bold ">Logout</p>
        </Button>
      )}
    </nav>
  );
}

export default Navigator;
