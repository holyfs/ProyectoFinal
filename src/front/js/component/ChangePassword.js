import React, {useState} from 'react';
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

    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
	  const [confirmPass, setConfirmPass] = useState("");

    const ChangePassword = () => {
      if (newpassword !== confirmPass) {
        alert("Las contraseñas no coinciden");
        return;
      }
      await fetch(process.env.BACKEND_URL + "/user/<int:id>/new-password", {
        method: "PUT",
        headers: {
          "Content-type": "multipart/form-data",
        },
        body: JSON.stringify({
          password: password,
          new_password: newpassword
        })
      });
    // necesitaria un RETURN aquí para cerrar modal y enviar un alert con "cambio de contraseña"
    }

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
                <input type="password" class="form-control" onChange={event => setPassword(event.target.value)} required/>
                <label class="form-control-placeholder" for="password">Antigua Password</label>
       </div>
       <div class="form-group">
                <input type="password" class="form-control" onChange={event => setNewPassword(event.target.value)} required/>
                <label class="form-control-placeholder" for="password">Nueva Password</label>
       </div>
       <div class="form-group">
                <input type="password" class="form-control" onChange={event => setConfirmPass(event.target.value)} required/>
                <label class="form-control-placeholder" for="password">Nueva Password</label>
       </div>

      <div class="btn-check-log">
        <button type="submit" class="btn-check-login" onClick={ChangePassword()}>Cambiar Contraseña</button>
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