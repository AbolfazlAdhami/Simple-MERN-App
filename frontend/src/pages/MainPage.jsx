import React from "react";
import { Header } from "../components";
import { Outlet } from "react-router-dom";

function MainPage({ children }) {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Header />
      {children}
      <Outlet />
    </div>
  );
}

export default MainPage;
