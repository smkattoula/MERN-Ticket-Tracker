import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class EditTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      category: "",
      priority: "",
      description: "",
      status: "",
      date: new Date(),
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("auth-token");
    axios
      .get("/api/tickets/" + this.props.match.params.id, {
        headers: { "x-auth-token": token },
      })
      .then((response) => {
        this.setState({
          subject: response.data.subject,
          category: response.data.category,
          priority: response.data.priority,
          description: response.data.description,
          status: response.data.status,
          date: new Date(response.data.date),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeSubject = (e) => {
    this.setState({
      subject: e.target.value,
    });
  };

  onChangeCategory = (e) => {
    this.setState({
      category: e.target.value,
    });
  };

  onChangePriority = (e) => {
    this.setState({
      priority: e.target.value,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onChangeStatus = (e) => {
    this.setState({
      status: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const ticket = {
      subject: this.state.subject,
      category: this.state.category,
      priority: this.state.priority,
      description: this.state.description,
      status: this.state.status,
      date: this.state.date,
    };

    console.log(ticket);
    const token = localStorage.getItem("auth-token");
    axios
      .post("/api/tickets/update/" + this.props.match.params.id, ticket, {
        headers: { "x-auth-token": token },
      })
      .then((res) => console.log(res.data));

    window.location = "/tickets";
  };

  render() {
    return (
      <Form>
        <h3>Edit Ticket</h3>
        <br />
        <FormGroup className="form-group">
          <Label for="category">Category</Label>
          <Input
            className="input"
            type="select"
            name="category"
            id="ticketCategory"
            value={this.state.category}
            onChange={this.onChangeCategory}
          >
            <option>Select a Ticket Category</option>
            <option>General</option>
            <option>Billing</option>
            <option>Login</option>
            <option>Abuse</option>
            <option>Website</option>
          </Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="priority">Priority</Label>
          <Input
            className="input"
            type="select"
            name="priority"
            id="ticketPriority"
            value={this.state.priority}
            onChange={this.onChangePriority}
          >
            <option>Select a Priority Level</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="status">Status</Label>
          <Input
            className="input"
            type="select"
            name="status"
            id="ticketStatus"
            value={this.state.status}
            onChange={this.onChangeStatus}
          >
            <option>Select a Status</option>
            <option>Open</option>
            <option>Closed</option>
          </Input>
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="subject">Subject</Label>
          <Input
            className="input"
            type="text"
            name="subject"
            id="ticketSubject"
            value={this.state.subject}
            onChange={this.onChangeSubject}
            placeholder="Enter ticket subject.."
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="description">Description</Label>
          <Input
            className="input"
            type="textarea"
            name="description"
            id="ticketDescription"
            value={this.state.description}
            onChange={this.onChangeDescription}
            placeholder="Enter ticket description.."
          />
        </FormGroup>
        <FormGroup className="form-group">
          <Label for="date">Date</Label>
          <div>
            <DatePicker
              className="date"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </FormGroup>

        <Button onClick={this.onSubmit} className="button">
          Submit
        </Button>
      </Form>
    );
  }
}
