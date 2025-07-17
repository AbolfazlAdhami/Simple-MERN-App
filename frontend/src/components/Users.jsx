import React from "react";
import UserItem from "./UserItem";

function Users({ users }) {
  if (users && users.length === 0) {
    return (
      <div className="self-center my-12">
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <div className="container my-12  ">
      <ul>
        <li className="border-b-2 border-slate-800 flex  items-center justify-between p-3 px-1">
          <h2>Avatar</h2>
          <h2>User Name</h2>
          <h2>Place Counts</h2>
        </li>
        {users.map((user) => (
          <UserItem user={user} />
        ))}
      </ul>
    </div>
  );
}

export default Users;
