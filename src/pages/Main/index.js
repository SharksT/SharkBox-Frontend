import React, { Component } from "react";
import "./styles.css";
import api from "../../services/api";
import { Form, Input } from "@rocketseat/unform";

export default class Main extends Component {
  state = {
    register: false,
    errorMessage: ""
  };
  handleSubmit = async data => {
    if (this.state.register) this.props.history.push(`/register`);
    try {
      const response = await api.post("/", data);
      const { user, token } = response.data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", user._id);
      api.setHeader("Authorization", `Bearer ${token}`);
      this.props.history.push(`/main/${user._id}`);
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };
  handleRegister = () => {
    this.setState({
      register: true
    });
  };
  render() {
    return (
      <div id="login-container">
        <Form onSubmit={this.handleSubmit}>
          {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
          <Input placeholder="e-mail" type="email" name="email" />
          <Input placeholder="senha" type="password" name="password" />
          <button type="submit" title="Login">
            Login
          </button>
          <button
            title="signUp"
            className="register"
            onClick={this.handleRegister}
          >
            Register
          </button>
        </Form>
      </div>
    );
  }
}
