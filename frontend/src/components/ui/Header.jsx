import React from "react";
import Navigator from "./Navigator";
import SideDrawer from "./SideDrawer";

function Header() {
  return (
    <header className="bg-slate-800 h-20 px-6 w-screen flex items-center  ">
      <Navigator />
      <SideDrawer />
    </header>
  );
}

export default Header;
