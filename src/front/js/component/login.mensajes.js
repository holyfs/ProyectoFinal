import React, { Component } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
import { ForgetPassword } from "./ForgetPassword";
import "../../styles/signup.css";
import '../../styles/App.css';
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Campo Requerido!!!
      </div>
    );
  }
};
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        (response) => {
          Swal.fire({
            icon: 'sucess',
            confirmButtonColor: 'rgb(25, 169, 149)',
            confirmButtonText:'Vamos a tu pagina personal!',
            title: 'Login Completo',
            text: 'Gracias por usar esta página web ',
          }).then((result) => {
            let user_id = localStorage.getItem("user_id")
            if (result.value) {window.location.href = "/personalbio:"+ user_id
            }
          })
        }).catch(error =>  {
          console.log(error.response.data.message.toString())
          const resMessage = error.response.data.message.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
        })
        }
  }
  render() {
    return (
      <Form
            className="form"
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
      
      
        <center>
          <img
            src="https://pbs.twimg.com/profile_images/897355385/cabeza-avatar.gif"
            alt="profile-img"
            className="profile-img-card"
            width="250"
			      height="250"
          />
        </center>
          
            <div className="form-group">
              <label htmlFor="username"> <FontAwesomeIcon icon={faEnvelope} /><strong>Email</strong></label>
              <Input
                type="text"
                className="cajas"
                name="username"
                placeholder="Introduce tu Email"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"><FontAwesomeIcon icon={faLock} /><strong>Password</strong></label>
              <Input
                type="password"
                className="cajas"
                name="password"
                placeholder="Introduce tu contraseña"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <button
                className="btnregistro"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
              <h4>No tienes cuenta?</h4><a href="/signup2">Registrate!</a>
              <h4><a href="/forgetpassword">¿Olvistaste tu contraseña?</a></h4>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        
      
    );
  }
}