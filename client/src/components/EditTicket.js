import React, { Component } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class EditTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      category: "",
      priority: "",
      description: "",
      date: new Date(),
    };
  }

  // componentDidMount() {
  //   axios
  //     .get("/api/tickets/" + this.props.match.params.id)
  //     .then((response) => {
  //       this.setState({
  //         subject: response.data.subject,
  //         category: response.data.category,
  //         priority: response.data.priority,
  //         description: response.data.description,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

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

  onSubmit = (e) => {
    e.preventDefault();

    const ticket = {
      subject: this.state.subject,
      category: this.state.category,
      priority: this.state.priority,
      description: this.state.description,
    };

    console.log(ticket);
    const token = localStorage.getItem("auth-token");
    axios
      .post("/api/tickets/update/" + this.props.match.params.id, ticket, {
        headers: { "x-auth-token": token },
      })
      .then((res) => console.log(res.data));

    window.location = "/";
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <h3>Edit Ticket</h3>
          <br />
          <Label for="category">Category</Label>
          <Input
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
        <FormGroup>
          <Label for="priority">Priority</Label>
          <Input
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
        <FormGroup>
          <Label for="subject">Subject</Label>
          <Input
            type="text"
            name="subject"
            id="ticketSubject"
            value={this.state.subject}
            onChange={this.onChangeSubject}
            placeholder="Enter ticket subject.."
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            id="ticketDescription"
            value={this.state.description}
            onChange={this.onChangeDescription}
            placeholder="Enter ticket description.."
          />
        </FormGroup>
        <Button onClick={this.onSubmit}>Submit</Button>
      </Form>
    );
  }
}
