import React, { useState } from 'react';
import '../../styles/App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import config from '../config';
import Swal from "sweetalert2";
import "../../styles/signup.css";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ForgetPassword = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");

  const SendPass = () => {
    fetch(config.hostname + `/api/user/reset-password`, {
      method: "PUT",
      headers: {
        "mode": 'no-cors',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    }).then((response) => {
      return response.json()
    }).then((response) => {
      if (response.msg = "Password enviado") {
        Swal.fire({
          title: response.msg,
          confirmButtonText: 'ok',
          confirmButtonColor: 'rgb(25, 179, 149)',

        }).then((result) => {
          if (result) {
            window.location.href = "/"
          }
        })
      }
      if (response.msg = "Email is not registered") {
        Swal.fire({
          title: response.msg,
          confirmButtonText: 'ok',
          confirmButtonColor: 'rgb(25, 179, 149)',

        }).then((result) => {
          if (result) {
            window.location.href = "/"
          }
        })
      }


      return;

    }).catch((error) => {
      Swal.fire({
        title: 'Error al hacer registro',
        confirmButtonText: 'ok',
        confirmButtonColor: 'rgb(25, 169, 149)',
      })
      console.log(error)
    })
  }


  return (
    <>
     <a onClick={handleShow}>
        <strong>¡Recuperar!</strong>
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>FaceMusicApp</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <form className="form">
      <center>
          <img
            src="https://www.shareicon.net/download/2016/05/29/772533_locked_512x512.png"
            alt="profile-img"
            className="profile-img-card"
            width="250"
			      height="250"
          />
          </center>
        <div className="form-group">
          <label className="form-control-placeholder" for="name"><FontAwesomeIcon icon={faEnvelope} /><strong>Email address:</strong></label>
          <input type="email" placeholder='Introduce tu email de usuario' className="form-control" required autocomplete="off" onChange={event => setEmail(event.target.value)}/>
          
        </div>
        <div className="d-flex justify-content-center mt-3 mb-2" >
          <button className="btnregistro" onClick={() => SendPass()}>Enviar Contraseña</button>
      </div>
      
      </form>
      </Modal.Body>

      <Modal.Footer>
          <Button className="btncerrar" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      

      


    </>
  )
}
