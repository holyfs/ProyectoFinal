import React, { useState, useEffect } from 'react';
import '../../styles/App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

class Contact extends React.Component {
  state = {
    abierto: false,
  }

  abrirModal = () => {
    useEffect(() => {
      getUserDataById();
    }, []);
    this.setState({ abierto: !this.state.abierto });
  }

  render() {

    const modalStyles = {
      position: "absolute",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [msg, setMsg] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const user_id = localStorage.getItem("user_id");
    //Debemos averiguar como conseguir el Id del usuario al que tiene que entrar despues de hacer fetch a private
    const getUserDataById = async () => {
      await axios.get(`https://3001-holyfs-proyectofinal-5zwcb1ywnhe.ws-eu54.gitpod.io/api/user/${user_id}`)
        .then(response => {
          setUsuarios(response.data.user);
          setUserEmail(response.data.email);
          setId(response.data.id)
        }).catch(error => {
          console.log(error);
        })
    }

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
          msg: msg,
          userEmail: userEmail
        })
      });
      // necesitaria un RETURN aquí para cerrar modal y enviar un alert con "mensaje enviado"



      return (
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

}
export default Contact; 