import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});
