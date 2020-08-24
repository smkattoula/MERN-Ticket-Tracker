import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import AppNavBar from "./components/AppNavBar";
import TicketList from "./components/TicketList";
import EditTicket from "./components/EditTicket";
import CreateTicket from "./components/CreateTicket";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserContext from "./context/UserContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("api/auth/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      if (tokenRes.data) {
        const userRes = await axios.get("/api/auth/user", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="App">
          <AppNavBar />
          <br />
          <Route exact path="/" component={Home} />
          <Route path="/tickets" component={TicketList} />
          <Route path="/edit/:id" component={EditTicket} />
          <Route path="/create" component={CreateTicket} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </div>
      </UserContext.Provider>
    </Router>
  );
}
