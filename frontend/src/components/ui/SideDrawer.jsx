import React, { useContext } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "./Button";

function SideDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <>
      <button className="block sm:hidden cursor-pointer ml-auto" onClick={toggleDrawer}>
        <FaBarsStaggered className="text-2xl text-slate-900 hover:text-slate-800 hover:scale-105 transition-all ease-in" />
      </button>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right">
        <div className="bg-slate-100 w-full h-full p-4 flex flex-col gap-3 justify-start items-">
          <button className="mb-8 self-end" onClick={toggleDrawer}>
            <CgClose className="text-red-600 transition ease-in cursor-pointer hover:text-red-700 text-3xl" />
          </button>
          <Link to={"/"} className={"text-2xl hover:text-slate-900 hover:border-b hover:border-slate-900 transition-all ease-linear font-bold "}>
            Home
          </Link>
          {isLoggedIn && (
            <Link to={"/place"} className={"text-2xl hover:text-slate-900 hover:border-b hover:border-slate-900 transition-all ease-linear font-bold "}>
              My Places
            </Link>
          )}
          {isLoggedIn && (
            <Link to={"/place/new"} className={"text-2xl hover:text-slate-900 hover:border-b hover:border-slate-900 transition-all ease-linear font-bold "}>
              Add New Place
            </Link>
          )}
          {!isLoggedIn && (
            <Link to={"/auth"} className={"text-2xl hover:text-slate-900 hover:border-b hover:border-slate-900 transition-all ease-linear font-bold "}>
              Login
            </Link>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => logout()}
              className={"bg-slate-50 border w-full border-slate-50 text-slate-950 hover:text-slate-50 hover:bg-transparent transition ease-in duration-200  rounded-lg  p-1 px-2 mt-auto"}
            >
              <p className="text-2xl font-bold ">Logout</p>
            </Button>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default SideDrawer;
