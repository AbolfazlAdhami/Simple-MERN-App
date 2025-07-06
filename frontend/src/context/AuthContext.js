import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  const loginHandler = async () => {};
  const logoutHandler = async () => {};

  const value = {
    isLoggedIn: isLogged,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
