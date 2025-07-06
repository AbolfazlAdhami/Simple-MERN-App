import React from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

function SideDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button className="block sm:hidden cursor-pointer" onClick={toggleDrawer}>
        <FaBarsStaggered className="text-2xl text-slate-50 hover:text-slate-300 hover:scale-110 transition-all ease-in" />
      </button>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right" className="bla bla bla">
        <div>Hello World</div>
      </Drawer>
    </>
  );
}

export default SideDrawer