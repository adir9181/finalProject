import React, { Component } from "react";
import usersService from "../services/usersService";

class LogOut extends Component {
  state = {};

  componentDidMount() {
    usersService.logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default LogOut;
