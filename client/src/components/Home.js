import React, { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="home">
      {userData.user ? (
        <>
          <h1>Welcome to Ticket Tracker, {userData.user.name}!</h1>
          <br />
          <h3>You are currently logged in.</h3>
        </>
      ) : (
        <>
          <h1>Welcome to Ticket Tracker!</h1>
          <br />
          <h3>Please register a new user or login to create tickets.</h3>
        </>
      )}
    </div>
  );
}
