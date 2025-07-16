import React from "react";

function Button({ onClick, children, className, disable = false, type }) {
  // type = "link" || 'primary' || 'success'

  return (
    <button
      disabled={disable}
      className={`${className} shadow hover:shadow-lg ease-in transition-all duration-200 my-2 cursor-pointer  p-2 rounded-lg text-white text-lg font-bold ${disable && "bg-gray-700"}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
