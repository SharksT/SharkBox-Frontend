import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";
import logo from "../../assets/logo.svg";

export default class CreateBox extends Component {
  state = {
    newBox: ""
  };
  async componentDidMount() {
    const user = sessionStorage.getItem("user");
    try {
      const response = await api.post(`${user}/boxes`, {
        title: this.state.newBox
      });
    } catch (e) {
      this.props.history.push(`/`);
    }
  }
  handleSubmit = async e => {
    const user = sessionStorage.getItem("user");
    e.preventDefault();
    const response = await api.post(`${user}/boxes`, {
      title: this.state.newBox
    });
    console.log(response.data.boxes[0]);
    this.props.history.push(`boxes/${response.data.boxes[0]}`);
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
