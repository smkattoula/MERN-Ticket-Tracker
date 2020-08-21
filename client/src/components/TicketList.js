import React, { Component } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Ticket = (props) => (
  <tr>
    <td>{props.ticket.subject}</td>
    <td>{props.ticket.description}</td>
    <td>{props.ticket.category}</td>
    <td>{props.ticket.priority}</td>
    <td>{props.ticket.date.substring(0, 10)}</td>
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
    axios
      .get("/api/tickets/")
      .then((res) => {
        this.setState({ tickets: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteTicket = (id) => {
    axios.delete("/api/tickets/" + id).then((res) => console.log(res.data));

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
  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Description</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>{this.ticketList()}</tbody>
      </Table>
    );
  }
}
