import React, { Component } from "react";
import AuthOptions from "./AuthOptions";

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

class AppNavBar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5 navbar">
          <NavbarBrand href="/">Ticket Tracker</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <AuthOptions />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default AppNavBar;
