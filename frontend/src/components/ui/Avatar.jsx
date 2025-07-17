import React from "react";

function Avatar({ image }) {
  return <img className="size-10 border border-slate-900 rounded-full object-center" src={image} alt="avatar" />;
}

export default Avatar;
