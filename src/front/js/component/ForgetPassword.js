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
import { useNavigate } from 'react-router-dom';

export const ForgetPassword = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();


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
      if (response.msg === 'Password enviado') {
        Swal.fire({
          title: 'Password enviado',
          confirmButtonText: 'ok',
          confirmButtonColor: 'rgb(25, 179, 149)',

        }).then((result) => {
          if (result) {
            navigate(`/`)
          }
        })
      }
      else if (response.msg === 'Email is not registered') {
        Swal.fire({
          title: 'Email no registrado',
          confirmButtonText: 'ok',
          confirmButtonColor: 'rgb(25, 179, 149)',

        }).then((result) => {
          if (result) {
            navigate(`/`)
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

      <Modal show={show} onHide={handleClose} className="d-flex justify-content-center" >
        {/* <Modal.Header closeButton>
          <Modal.Title>FaceMusicApp</Modal.Title>
        </Modal.Header> */}
       {/*  <Modal.Body> */}

      <form className="form2 m-0">
      <center>
          <img
            src="https://www.shareicon.net/download/2016/05/29/772533_locked_512x512.png"
            alt="profile-img"
            className="profile-img-card"
            width="250"
			      height="250"
          />
          </center>
        <div className="form-group mt-3">
          <input type="email" placeholder='Introduce tu email de usuario' className="form-control" required autocomplete="off" onChange={event => setEmail(event.target.value)}/>
        </div>
        <div className="d-flex justify-content-center mt-3 mb-2" >
          <button className="btnregistro" onClick={() => SendPass()}>Enviar contraseña</button>
      </div>
      
  {/*     </Modal.Body> */}

      <Modal.Footer>
      <Button className="btn btn-danger" onClick={handleClose}>Cerrar</Button>
         {/*  <Button className="btncerrar" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Footer>
          </form>
      </Modal>
      

      


    </>
  )
}
