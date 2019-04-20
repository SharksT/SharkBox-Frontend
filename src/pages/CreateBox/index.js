import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";
import logo from "../../assets/logo.svg";

export default class CreateBox extends Component {
  state = {
    newBox: ""
  };
  handleSubmit = async e => {
    const token = sessionStorage.getItem("token");
    e.preventDefault();
    const response = await api.post(
      "boxes",
      {
        title: this.state.newBox
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      }
    );
    this.props.history.push(`/box/${response.data._id}`);
  };
  handleInputChange = e => {
    this.setState({
      newBox: e.target.value
    });
  };

  render() {
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="" />
          <input
            placeholder="criar um box"
            value={this.state.newBox}
            onChange={this.handleInputChange}
          />
          <button type="submit" title="criar">
            Criar
          </button>
        </form>
      </div>
    );
  }
}
