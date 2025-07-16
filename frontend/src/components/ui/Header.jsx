import React from "react";
import Navigator from "./Navigator";
import SideDrawer from "./SideDrawer";
import logo from "../../assets/react.svg";
function Header() {
  return (
    <header className="bg-slate-200 border-b border-slate-300 h-20 px-6 w-screen flex items-center  ">
      <img src={logo} className="size-10 mr-5" alt="" />
      <Navigator />
      <SideDrawer />
    </header>
  );
}

export default Header;
