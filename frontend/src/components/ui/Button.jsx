import React from "react";

function Button({ onClick, children, className, disable = false }) {
  return (
    <button disabled={disable} className={`${className} border border-slate-50 cursor-pointer  p-4 rounded bg-sky-400 hover:bg-sky-600 hover:shadow-lg text-white`} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
