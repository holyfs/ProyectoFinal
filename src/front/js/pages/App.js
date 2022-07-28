import React, { useContext, useState, Component } from "react";
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
class Login extends React.Component{
  
  state={
    abierto: false,
  }

  abrirModal=()=>{
    this.setState({abierto: !this.state.abierto});
  }
  
  render(){

    const modalStyles={
      position: "absolute",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      
    }
      

    return(
      
      <>
      <div className="principal">
        <div className="secundario">
      <div color="blue" onClick={this.abrirModal}>Login</div>

      </div></div>

      <Modal isOpen={this.state.abierto} style={modalStyles}>
      <form class="seminor-login-form"  >
              <div class="form-group">
            <input
						type="email"
						className="form-control"
						placeholder="email"
						onChange={event => setEmail(event.target.value)}
						required
					/>
                <label class="form-control-placeholder" for="name">Email address</label>
              </div>
              <div class="form-group">
              <input
						type="password"
						className="form-control"
						placeholder="password"
						onChange={event => setPassword(event.target.value)}
						required
					    />
                <label class="form-control-placeholder" for="password">Password</label>
              </div>
              <div class="form-group">
                <label class="container-checkbox">
                Remember Me On This Computer
                <input type="checkbox" checked="checked" required />
                <span class="checkmark-box"></span>
                </label>
                </div>
        
                
        
              <div class="forgot-pass-fau text-center pt-3">
                                        <a href="#" class="text-secondary">Forgot Your Password?</a>
        
                                      </div>
                                      <div class="create-new-fau text-center pt-3">
                                          <a href="#" class="text-primary-fau"><span data-toggle="modal" data-target="#sem-reg" data-dismiss="modal">Create A New Account</span></a>
                                      </div>

                                      <ModalFooter>
            <Button color="primary" type="submit">Iniciar Sesión</Button>
            <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
        </ModalFooter>
        
        
        
              </form>
			  
      </Modal>
      </>
    )
      
    
  }
}

export default Login;