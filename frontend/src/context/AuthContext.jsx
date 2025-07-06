import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});

function AuthContextProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);

  const loginHandler = async () => {};
  const logoutHandler = async () => {};
  const value = useMemo(() => ({ isLoggedIn: isLogged, login: loginHandler, logout: logoutHandler }), [isLogged]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
