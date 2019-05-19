import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";
import { Form, Input } from "@rocketseat/unform";

export default class Register extends Component {
  state = {
    errorMessage: ""
  };
  handleSubmit = async data => {
    try {
      const response = await api.post("/register", data);
      console.log(data);
      const { user, token } = response.data;
      sessionStorage.setItem("token", token);
      this.props.history.push(`/`);
    } catch (response) {
      this.setState({ errorMessage: response.data.error });
    }
  };

  render() {
    return (
      <div id="register-container">
        <Form onSubmit={this.handleSubmit}>
          {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
          <Input placeholder="Nome" name="name" />
          <Input placeholder="E-mail" name="email" />
          <Input type="password" placeholder="Senha" name="password" />
          <button type="submit" title="Criar">
            Criar
          </button>
        </Form>
      </div>
    );
  }
}
