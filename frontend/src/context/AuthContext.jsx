import { createContext, useMemo, useState } from "react";

export const authContext = createContext({
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});

function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  const loginHandler = async () => {};
  const logoutHandler = async () => {};
  const value = useMemo(() => ({ isLoggedIn: isLogged, login: loginHandler, logout: logoutHandler }), [isLogged]);
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthContextProvider;
