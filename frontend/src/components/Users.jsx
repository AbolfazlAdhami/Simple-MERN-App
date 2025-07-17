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
      <div className="w-full bg-slate-200  rounded-lg">
        <table className="table rounded-lg border-separate border-spacing-2  w-full">
          <thead className="bg-slate-300">
            <tr>
              <th className="p-2 rounded-lg text-center">Avatar</th>
              <th className="p-2 rounded-lg text-start">User Name</th>
              <th className="p-2 rounded-lg text-start">Place Count</th>
            </tr>
          </thead>
          <tbody className="bg-slate-300">
            {users.map((user) => (
              <UserItem user={user} key={user.id} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Users;
