import React from 'react';
import '../../styles/App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

class ChangePassword extends React.Component{
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
      <Button color="danger" onClick={this.abrirModal}>Cambiar contraseña</Button>

      </div></div>

      <Modal isOpen={this.state.abierto} style={modalStyles}>
      <div class="form-group">
                <input type="password" class="form-control" required autocomplete="off" />
                <label class="form-control-placeholder" for="password">Antigua Password</label>
       </div>
       <div class="form-group">
                <input type="password" class="form-control" required autocomplete="off" />
                <label class="form-control-placeholder" for="password">Nueva Password</label>
       </div>
       <div class="form-group">
                <input type="password" class="form-control" required autocomplete="off" />
                <label class="form-control-placeholder" for="password">Nueva Password</label>
       </div>

      <div class="btn-check-log">
        <button type="submit" class="btn-check-login">cambiar contraseña</button>
      </div>
        <ModalFooter>
            <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
      </>
    )
  }
}

export default ChangePassword;