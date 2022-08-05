import React, { useContext, useState, Component } from "react";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import '../../styles/App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import Signup from '../component/signup';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../../services/auth.service";
import "../../styles/signup.css";
import Swal from "sweetalert2"
import {ForgetPassword} from "../component/ForgetPassword"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Campo Requerido!!!
      </div>
    );
  }
};
class Login extends React.Component{

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
            title: 'Login Completo',
            text: 'Gracias por usar esta página web ',
            confirmButtonColor: 'rgb(25, 169, 149)',
            confirmButtonText:'Vamos a tu pagina personal'
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


  state={
    abierto: false,
  }

  abrirModal=()=>{
    this.setState({abierto: !this.state.abierto});
  }
  
  render(){

    
      

    return(
      
      <>
      
      <div color="blue" onClick={this.abrirModal}>🅻🅾🅶🅸🅽🎙</div>

      
      
      <Modal isOpen={this.state.abierto}>
      <Form className="form"
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
            
        
              <button
                className="btnregistro"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
              <h4>¿No tienes cuenta?</h4><a href="/signup2">¡Registrate!</a>
              <h4>¿Olvidaste Tu Contraseña?</h4><a href="#"><ForgetPassword /></a>
            
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

                                      <ModalFooter>
            <Button className="btncerrar" onClick={this.abrirModal}>Cerrar</Button>
        </ModalFooter>
        
        
        
              </Form>
              
      
			  
      </Modal>
      </>
    )
      
    
  }
}

export default Login;