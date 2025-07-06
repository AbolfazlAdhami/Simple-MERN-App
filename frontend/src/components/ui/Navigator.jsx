import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navigator() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <nav className="hidden md:flex items-center gap-2">
      <NavLink className={"text-xl font-bold "}>
        <h1>All User</h1>
      </NavLink>
      {isLoggedIn && (
        <NavLink className={"text-xl font-bold "}>
          <h1>My Places</h1>
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink className={"text-xl font-bold "}>
          <h1>Add New Place</h1>
        </NavLink>
      )}
      {isLoggedIn && (
        <NavLink className={"text-xl font-bold "}>
          <h1>Login</h1>
        </NavLink>
      )}
      {!isLoggedIn && (
        <NavLink className={"text-xl font-bold "}>
          <h1>Logout</h1>
        </NavLink>
      )}
    </nav>
  );
}

export default Navigator;
