import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";

export default class Register extends Component {
  state = {
    email: "",
    password: "",
    name: ""
  };
  handleSubmit = async e => {
    try {
      e.preventDefault();
      const response = await api.post("/register", {
        email: `${this.state.email}`,
        password: `${this.state.password}`,
        name: `${this.state.name}`
      });
      const { user, token } = response.data;
      sessionStorage.setItem("token", token);
      this.props.history.push(`/`);
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
  handleNameChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  render() {
    return (
      <div id="register-container">
        <form onSubmit={this.handleSubmit}>
          {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
          <input
            placeholder="Nome"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
          <input
            type="password"
            placeholder="Senha"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
          <button type="submit" title="Criar">
            Criar
          </button>
        </form>
      </div>
    );
  }
}
