import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AuthContextProvider from "./context/AuthContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
