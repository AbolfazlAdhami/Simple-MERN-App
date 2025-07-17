import React from "react";
import Avatar from "./ui/Avatar";

function UserItem({ user }) {
  const { image, name, places: placeCount } = user;

  return (
    <tr className="border-b rounde-lg">
      <td className="flex justify-center items-center bg-slate-200 ">
        <Avatar image={image} />
      </td>
      <td className="p-1 rounded-lg">{name}</td>
      <td className="p-1 rounded-lg">{placeCount ? ` ${placeCount} ${placeCount > 1 ? "Place" : "Places"}` : "No Place"}</td>
    </tr>
  );
}

export default UserItem;
