import React from "react";
// import { useHistory } from "react-router-dom";
import { NavItem, NavLink } from "reactstrap";

export default function AuthOptions() {
  //   const history = useHistory();

  //   const register = () => history.push("/register");
  //   const login = () => history.push("/login");

  return (
    <>
      <NavItem>
        <NavLink href="/login">Login</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/register">Register</NavLink>
      </NavItem>
    </>
  );
}
