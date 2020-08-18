import React, { Component } from "react";
import axios from "axios";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class CreateTicket extends Component {
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

    axios.post("/", ticket).then((res) => console.log(res.data));

    window.location = "/";
  };

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input
            type="select"
            name="category"
            value={this.state.category}
            onChange={this.onChangeCategory}
          >
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
            value={this.state.priority}
            onChange={this.onChangePriority}
          >
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