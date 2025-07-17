import React from "react";
import Avatar from "./ui/Avatar";

function UserItem({ user }) {
  const { image, name, places: placeCount } = user;

  return (
    <li className="border-b border-slate-950 flex items-center justify-between p-2">
      <Avatar image={image} />
      <h1>{name}</h1>
      <p>
        {placeCount} {placeCount === 1 ? "Place" : "Places"}
      </p>
    </li>
  );
}

export default UserItem;
