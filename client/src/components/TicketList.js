import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Ticket = (props) => (
  <tr>
    <td>{props.ticket.category}</td>
    <td>{props.ticket.priority}</td>
    <td>{props.ticket.subject}</td>
    <td>{props.ticket.description}</td>
    <td>{props.ticket.date.substring(0, 10)}</td>
    <td>{props.ticket.status}</td>
    <td>
      <Link to={"/edit/" + props.ticket._id} style={{ color: "#20c997" }}>
        Edit
      </Link>{" "}
      |{" "}
      <button
        style={{
          color: "#dc3545",
          border: "none",
          background: "transparent",
          padding: "0",
        }}
        href="#"
        onClick={() => {
          props.deleteTicket(props.ticket._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class TicketList extends Component {
  constructor(props) {
    super(props);

    this.state = { tickets: [] };
  }

  componentDidMount() {
    const token = localStorage.getItem("auth-token");
    axios
      .get("/api/tickets/", { headers: { "x-auth-token": token } })
      .then((res) => {
        this.setState({ tickets: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteTicket = (id) => {
    const token = localStorage.getItem("auth-token");
    axios
      .delete("/api/tickets/" + id, { headers: { "x-auth-token": token } })
      .then((res) => console.log(res.data));

    this.setState({
      tickets: this.state.tickets.filter((el) => el._id !== id),
    });
  };

  ticketList = () => {
    return this.state.tickets.map((currentTicket) => {
      return (
        <Ticket
          ticket={currentTicket}
          deleteTicket={this.deleteTicket}
          key={currentTicket._id}
        />
      );
    });
  };

  clearInputs = () => {
    this.setState({
      tickets: [],
    });
  };

  render() {
    return (
      <Table striped className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Priority</th>
            <th>Subject</th>
            <th>Description</th>
            <th>Date</th>
            <th>Status</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{this.ticketList()}</tbody>
      </Table>
    );
  }
}
