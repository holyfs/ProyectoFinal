import React from 'react';
import '../../styles/App.css';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

class Contact extends React.Component{
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

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
	  const [phone, setPhone] = useState("");
    const [msg, setMsg] = useState("");

    const SendMsg = () => {
      fetch(process.env.BACKEND_URL + "/sendMsg", {
        method: "PUT",
        headers: {
          "Content-type": "multipart/form-data",
        },
        body: JSON.stringify({
          email: email,
          name: name,
          phone: phone,
          msg: msg
        })
      });
      // necesitaria un RETURN aquí para cerrar modal y enviar un alert con "mensaje enviado"
    }


    return(
      <>
      <div className="principal">
        <div className="secundario">
      <Button color="btn btn-dark" onClick={this.abrirModal}>Contactar</Button>

      </div></div>

      <Modal isOpen={this.state.abierto} style={modalStyles}>
      <form class="seminor-login-form">
              <div class="form-group">
                <label class="form-control-placeholder" for="name">Email address</label>
                <input type="email" class="form-control" onChange={event => setEmail(event.target.value)} required />
              </div>
              <div class="form-group">
                <label class="form-control-placeholder" for="nombre">Nombre</label>
                <input type="nombre" class="form-control" onChange={event => setName(event.target.value)} required />
              </div>
              <div class="form-group">
                <label class="form-control-placeholder" for="Teléfono">Telefono</label>
                <input type="mensaje" class="form-control" onChange={event => setPhone(event.target.value)} required />
              </div>
              <div class="form-group">
                <label class="form-control-placeholder" for="nombre">Mensaje</label>
                <input type="mensaje" class="form-control" onChange={event => setMsg(event.target.value)} required />
              </div>
              <div class="btn-check-log">
                    <button type="submit" className="btn btn-dark" onClick={SendMsg()}>Enviar</button>
              </div>
        
        
              
                <ModalFooter>
            
            <Button color="secondary" onClick={this.abrirModal}>Cerrar</Button>
        </ModalFooter>
        
        
        
              </form>
			  
      </Modal>
      </>
    )
  }
}

export default Contact;