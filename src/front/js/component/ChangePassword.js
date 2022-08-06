import React, { useState } from 'react';
import '../../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import config from '../config';
import Swal from "sweetalert2";
import "../../styles/signup.css";
import '../../styles/App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams, useNavigate } from 'react-router-dom';



export const ChangePassword = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  let id = window.location.href.split(":")[2]
  // const params = useParams();
  // let id = params['id'];
  const navigate = useNavigate();


  const ChangePassword = async () => {

    let newRequest = new FormData();
    newRequest.append("password", password);
    newRequest.append("new_password",newpassword);
    newRequest.append("id", id)
    const token = JSON.parse(localStorage.getItem("jwt-token"));

    if (newpassword !== confirmPass) {
      alert("Las contraseñas no coinciden");
      return;
    }
    else {
      const response = await fetch(config.hostname + `/api/user/new-password`, {
        method: "PUT",
        headers: {
          "mode": 'no-cors',
          "Authorization": "Bearer " + token.token
        },
        body: newRequest
      });
      const responseJson = await response.json();
      Swal.fire({
        icon: 'sucess',
        title: 'Contraseña guardada',
        timer: 5500

      }).then(() => {
        navigate(`/personalbio:${id}`)
      })
      return responseJson;
    }
  }

    return (
      <>
      <a onClick={handleShow}>
      <button className="btn btn-secondary">Cambiar Contraseña</button>
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>FaceMusicApp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <div className="form">
      
        <center>
          <img
            src="https://www.muycomputer.com/wp-content/uploads/2018/06/WiFi-password.jpg"
            alt="profile-img"
            className="profile-img-card"
            width="250"
			      height="250"
          />
        </center>
        
        <label><strong>Antigua Contraseña:</strong></label>
        <input type="password" className="form-control cajas" onChange={event => setPassword(event.target.value)} required />
        
      
        
        <label><strong>Nueva Contraseña:</strong>  </label>
  
        <input type="password" className="form-control cajas" onChange={event => setNewPassword(event.target.value)} required />
        
        <label><strong>Confimre Contraseña:</strong>  </label>
      
        <input type="password" className="form-control cajas" onChange={event => setConfirmPass(event.target.value)} required />
      
      
        
          <button className="btnregistro" onClick={() => ChangePassword()}>Cambiar contraseña</button>
        
      
        
            
        
        </div>
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

