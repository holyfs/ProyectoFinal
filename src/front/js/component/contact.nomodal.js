import React, { useState } from 'react';
import '../../styles/App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import config from '../config';
import Swal from "sweetalert2";
import "../../styles/signup.css";
import '../../styles/App.css';


export const ContactNoModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  let id = window.location.href.split(":")[2]


  const SendMsg = async() => {
   const response = await fetch(config.hostname + "/api/sendmsg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        contact_email: email,
        phone: phone,
        mensaje: msg,
        id_user: id
      })
    })
   alert("mensaje y listo")
   window.location.href = '/bio:' + id
    }  
    



  return (
    <>
    <a onClick={handleShow}>
    <button type="button" className="btn btn-info">Contactar</button>
    </a>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>FaceMusicApp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      <form className="form">
      <center>
          <img
            src="https://us.123rf.com/450wm/8vfanrf/8vfanrf1602/8vfanrf160200067/53778178-contacto-iconos-de-correo-electr%C3%B3nico-concepto-bolet%C3%ADn-tel%C3%A9fono-.jpg?ver=6"
            alt="profile-img"
            className="profile-img-card"
            width="250"
			      height="250"
          />
        </center>
        <div className="form-group">
          <label className="form-control-placeholder" for="name"><strong>Email address:</strong></label>
          <input type="email" className="form-control cajas" onChange={event => setEmail(event.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-control-placeholder" for="nombre"><strong>Nombre:</strong></label>
          <input type="nombre" className="form-control cajas" onChange={event => setName(event.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-control-placeholder" for="Teléfono"><strong>Telefono:</strong></label>
          <input type="mensaje" className="form-control cajas" onChange={event => setPhone(event.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-control-placeholder" for="nombre"><strong>Mensaje:</strong></label>
          <textarea type="mensaje" className="form-control cajas" onChange={event => setMsg(event.target.value)} required />
        </div>
        <div className="d-flex justify-content-center mt-3 mb-2" >
          <button className="btnregistro" onClick={() => SendMsg()}>Enviar</button>
        </div>

      </form>
      </Modal.Body>
      <Modal.Footer>
          <Button className="btn btn-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
