import React, { Component } from "react";
import { Table } from "reactstrap";

export default class TicketList extends Component {
  constructor(props) {
    super(props);

    this.state = { tickets: [] };
  }

  // componentDidMount() {}

  render() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Description</th>
            <th>Category</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    );
  }
}
