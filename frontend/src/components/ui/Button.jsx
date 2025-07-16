import React from "react";

function Button({ onClick, children, className, disable = false }) {
  return (
    <button disabled={disable} className={`${className} border border-slate-50 cursor-pointer  p-4 rounded-xl bg-blue-700 hover:bg-blue-900 text-white`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
