import React from "react";
import UserItem from "./UserItem";
import Avatar from "./ui/Avatar";

function Users({ users }) {
  if (users && users.length === 0) {
    return (
      <div className="self-center my-12">
        <h2>No users found.</h2>
      </div>
    );
  }

  return (
    <section className="container my-12 flex justify-center items-center ">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
        {users.map((user) => (
          <div className="rounded-lg" key={user.id}>
            <Avatar />
            <h2></h2>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;
