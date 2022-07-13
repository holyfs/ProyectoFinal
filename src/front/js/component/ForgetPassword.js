import React from 'react';
import '../../styles/App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

class ForgetPassword extends React.Component{
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
      <Button color="danger" onClick={this.abrirModal}>Olvidar contraseña</Button>

      </div></div>

      <Modal isOpen={this.state.abierto} style={modalStyles}>
      <form class="seminor-login-form">
        <div class="form-group">
          <input type="email" class="form-control" required autocomplete="off" />
          <label class="form-control-placeholder" for="name">Email address</label>
        </div>
      </form>
      <div class="btn-check-log">
        <button type="submit" class="btn-check-login">enviar email</button>
      </div>
        <ModalFooter>
            <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
      </>
    )
  }
}

export default ForgetPassword;