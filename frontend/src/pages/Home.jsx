import React from "react";
import { Users } from "../components";

function Home() {
  const users = [
    {
      id: "u1",
      name: "Max Schwarz",
      image: "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      places: 3,
    },
  ];

  return <Users users={users} />;
}

export default Home;
