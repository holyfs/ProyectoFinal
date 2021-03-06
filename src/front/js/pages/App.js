import React from 'react';
import '../../styles/App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import Signup from '../component/signup';

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
      transform: 'translate(-50%, -50%)'
    }
    return(
      <>
      <div className="principal">
        <div className="secundario">
      <Button color="danger" onClick={this.abrirModal}>Login</Button>

      </div></div>

      <Modal isOpen={this.state.abierto} style={modalStyles}>
      <form class="seminor-login-form">
              <div class="form-group">
                <input type="email" class="form-control" required autocomplete="off" />
                <label class="form-control-placeholder" for="name">Email address</label>
              </div>
              <div class="form-group">
                <input type="password" class="form-control" required autocomplete="off" />
                <label class="form-control-placeholder" for="password">Password</label>
              </div>
              <div class="form-group">
                <label class="container-checkbox">
                Remember Me On This Computer
                <input type="checkbox" checked="checked" required />
                <span class="checkmark-box"></span>
                </label>
                </div>
        
                <div class="btn-check-log">
                    <button type="submit" class="btn-check-login">LOGIN</button>
                </div>
        
        
              <div class="forgot-pass-fau text-center pt-3">
                                        <a href="#" class="text-secondary">Forgot Your Password?</a>
        
                                      </div>
                                      <div class="create-new-fau text-center pt-3">
                                          <a href="#" class="text-primary-fau"><span data-toggle="modal" data-target="#sem-reg" data-dismiss="modal">Create A New Account <Signup /></span></a>
                                      </div>

                                      <ModalFooter>
            <Button color="primary">Iniciar Sesi??n</Button>
            <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
        </ModalFooter>
        
        
        
              </form>
			  
      </Modal>
      </>
    )
  }
}

export default Login;
