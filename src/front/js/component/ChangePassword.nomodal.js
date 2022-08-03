import React, { useState } from 'react';
import '../../styles/App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import config from '../config';
import Swal from "sweetalert2";
import "../../styles/signup.css";
import '../../styles/App.css';


export const ChangePasswordNoModal = () => {

  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  let id = window.location.href.split(":")[2]

  const ChangePassword = async () => {

    let newRequest = new FormData();
    newRequest.append("password", password);
    newRequest.append("new_password",newpassword);
    const token = JSON.parse(localStorage.getItem("jwt-token"));

    if (newpassword !== confirmPass) {
      alert("Las contraseñas no coinciden");
      return;
    }
    else {
      const response = await fetch(config.hostname + `/api/user/${id}/new-password`, {
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

      }).then(() => {
        window.location.href = '/personalbio:' + id
      })
      return responseJson;
    }
  }

    return (
      <>
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
        
      
        
            <a href={"/personalbio:" + id}>
              <input type="button" className="btn btn-danger" value="Cerrar" />
            </a>
        
        </div>
      </>
    )

  }

