import React, { Component } from "react";
//import logo from "../../assets/logo.svg";
import api from "../../services/api";
import "semantic-ui-css/semantic.min.css";
import { Button, Popup, Menu } from "semantic-ui-react";
import "./styles.css";
import { MdInsertDriveFile, MdFolder } from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from "react-dropzone";
import socket from "socket.io-client";

import { Form, Input } from "@rocketseat/unform";

export default class Box extends Component {
  state = { box: {}, present: null, old: null };

  async componentDidMount() {
    this.subscribeToNewFiles();
    const token = sessionStorage.getItem("token");
    if (token === null) {
      this.props.history.push(`/`);
    }
    api.setHeader("Authorization", `Bearer ${token}`);
    const box = this.props.match.params.id;
    const response = await api.get(`${box}/boxes/`);
    this.setState({
      box: response.data,
      present: box,
      old:
        box === sessionStorage.getItem("old")
          ? null
          : sessionStorage.getItem("old")
    });
  }

  subscribeToNewFiles = () => {
    const box = this.props.match.params.id;
    const io = socket("https://backendproj1.herokuapp.com");
    io.emit("connectRoom", box);
    io.on("file", data => {
      this.setState({
        box: {
          ...this.state.box,
          files: [data, ...this.state.box.files]
        }
      });
    });
    io.on("box", data => {
      this.setState({
        box: {
          ...this.state.box,
          boxes: [data, ...this.state.box.boxes]
        }
      });
    });
  };
  handleNewBox = async data => {
    const user = sessionStorage.getItem("user");
    const response = await api.post(
      `${this.props.match.params.id}/boxes/`,
      data
    );
  };
  handleUpload = files => {
    files.forEach(file => {
      const data = new FormData();
      const box = this.props.match.params.id;
      data.append("file", file);
      api.post(`boxes/${box}/files`, data);
    });
  };
  handleLogout = () => {
    sessionStorage.removeItem("token");
    api.setHeader("Authorization", `null`);
    this.props.history.push(`/`);
  };
  render() {
    return (
      <div id="box-container">
        <header>
          <h1>{this.state.box.title}</h1>
        </header>
        <Menu secondary>
          <Popup trigger={<Button content="Criar nova pasta" />} on="click">
            <Form onSubmit={this.handleNewBox}>
              <Input name="title" placeholder="Nome da pasta" />
              <Button size="tiny" icon="add" />
            </Form>
          </Popup>
          <Popup trigger={<Button content="Enviar arquivo" />} on="click">
            <Dropzone onDropAccepted={this.handleUpload}>
              {({ getRootProps, getInputProps }) => (
                <div className="upload" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Arraste arquivos ou clique aqui</p>
                </div>
              )}
            </Dropzone>
          </Popup>
          <Menu.Menu position="right">
            <Button position="right" onClick={this.handleLogout}>
              Logout
            </Button>
          </Menu.Menu>
        </Menu>
        {this.state.old !== null ? (
          <ul>
            <li>
              {" "}
              <a
                className="fileInfo"
                href={`/main/${this.state.old}`}
                target="_self"
              >
                <MdFolder size={24} color="#A5Cfff" />
                <strong>...</strong>
              </a>
            </li>
          </ul>
        ) : null}
        <ul>
          {this.state.box.boxes &&
            this.state.box.boxes.map(boxes => (
              <li key={boxes._id}>
                <a
                  className="fileInfo"
                  href={`/main/${boxes._id}`}
                  target="_self"
                  onClick={sessionStorage.setItem("old", this.state.present)}
                >
                  <MdFolder size={24} color="#A5Cfff" />
                  <strong>{boxes.title}</strong>
                </a>
                <span>
                  há{" "}
                  {distanceInWords(boxes.createdAt, new Date(), { locale: pt })}
                </span>
              </li>
            ))}
        </ul>
        <ul>
          {this.state.box.files &&
            this.state.box.files.map(file => (
              <li key={file._id}>
                <a className="fileInfo" href={file.url} target="_blank">
                  <MdInsertDriveFile size={24} color="#A5Cfff" />
                  <strong>{file.title}</strong>
                </a>
                <span>
                  há{" "}
                  {distanceInWords(file.createdAt, new Date(), { locale: pt })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
