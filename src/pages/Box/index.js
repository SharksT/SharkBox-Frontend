import React, { Component } from "react";
import logo from "../../assets/logo.svg";
import "./styles.css";
import { MdInsertDriveFile } from "react-icons/md";

export default class Box extends Component {
  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <h1>teste</h1>
        </header>
        <ul>
          <li>
            <a className="fileInfo" href="">
              <MdInsertDriveFile size={24} color="#A5Cfff" />
              <storng>Desafio.pdf</storng>
            </a>
            <span>3 min ago</span>
          </li>
        </ul>
      </div>
    );
  }
}
