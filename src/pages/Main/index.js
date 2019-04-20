import React, { Component } from "react";
import "./styles.css";
import api from "../../services/api";
export default class Main extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: ""
  };
  componentDidMount() {
    if (sessionStorage.getItem("token") != undefined)
      this.props.history.push(`/principal`);
  }
  handleSubmit = async e => {
    try {
      e.preventDefault();
      const response = await api.post("/", {
        email: `${this.state.email}`,
        password: `${this.state.password}`
      });
      const { user, token } = response.data;
      sessionStorage.setItem("token", token);
      this.props.history.push(`/principal`);
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };
  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };
  render() {
    return (
      <div id="login-container">
        <form onSubmit={this.handleSubmit}>
          {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
          <input
            placeholder="e-mail"
            type="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <input
            placeholder="senha"
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <button type="submit" title="Login">
            Login
          </button>
        </form>
      </div>
    );
  }
}
