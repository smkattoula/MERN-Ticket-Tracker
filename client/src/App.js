import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppNavBar from "./components/AppNavBar";
import TicketList from "./components/TicketList";
import EditTicket from "./components/EditTicket";
import CreateTicket from "./components/CreateTicket";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavBar />
        <br />
        <Route path="/" exact component={TicketList} />
        <Route path="/edit/:id" exact component={EditTicket} />
        <Route path="/create" exact component={CreateTicket} />
      </div>
    </Router>
  );
}

export default App;
