import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import config from '../config';
import Swal from "sweetalert2";
import "../../styles/signup.css";
import '../../styles/App.css';


export const Contact = () => {
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
        <form className="contactForm" >
          <center>
            <img
              src="https://alarmtech.com.do/wp-content/uploads/2019/05/contact-us-1024x350.jpg"
              alt="profile-img"
              className="profile-img-card"
              width="300"
              height="150"
            />
          </center>
          <div className="form-group mt-4">
            <input type="text" placeholder='Nombre' className="form-control cajas" onChange={event => setName(event.target.value)} required />
          </div>
          <div className="form-group">
            <input type="email" placeholder='Email' className="form-control cajas" onChange={event => setEmail(event.target.value)} required />
          </div>
          <div className="form-group">
            <input type="text" placeholder='Teléfono' className="form-control cajas" onChange={event => setPhone(event.target.value)} required />
          </div>
          <div className="form-group">
            <textarea type="text" placeholder='Escribe tu mensaje aquí...' className="form-control cajas" onChange={event => setMsg(event.target.value)} required />
          </div>
          <div className="d-flex justify-content-center mt-3 mb-2" >
            <button className="btnregistro" onClick={() => SendMsg()}>Enviar</button>
          </div>
          <div className="d-flex justify-content-end"><Button className="btn btn-danger d-flex justify-content-end" onClick={handleClose}>
            Cerrar
          </Button></div>
        </form>
      </Modal>
    </>
  )
}
