import React from "react";
import { Users } from "../components";

function Home() {
  const users = [
    {
      id: "u1",
      name: "Max Schwarz",
      image: "https://images.unsplash.com/photo-1584999734482-0361aecad844?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
      places: 3,
    },
  ];

  return <Users users={users} />;
}

export default Home;
