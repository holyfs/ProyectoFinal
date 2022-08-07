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
  let id_1 = window.location.href.split(":")[2]
  let id = id_1.split("?")[0]
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
      }).then((response) => {
        return response.json()
      }).then((response) => {
          Swal.fire({
            title: 'Password Cambiado',
            confirmButtonText: 'ok',
            confirmButtonColor: 'rgb(25, 179, 149)',
  
          }).then((result) => {
            if (result) {
              window.location.href = "/PersonalBio:" + id
            }
          })
        })
      
     
      // window.location.href = config.hostname + "/PersonalBio:" + id
      
      return ;
    }
  }

    return (
      <>
      <a onClick={handleShow}>
      <button className="btn btn-secondary">Cambiar contraseña</button>
      </a>
        <Modal show={show} onHide={handleClose}>
  
          <form className="form m-0">

            <center>
              <img
                src="https://www.shareicon.net/download/2016/05/29/772533_locked_512x512.png"
                alt="profile-img"
                className="profile-img-card mb-3"
                width="250"
                height="250"
              />
            </center>
            <input type="password" placeholder='Antigua contraseña' className="form-control cajas" onChange={event => setPassword(event.target.value)} required />

            <input type="password" placeholder='Nueva contraseña' className="form-control cajas" onChange={event => setNewPassword(event.target.value)} required />

            <input type="password" placeholder='Confirma nueva contraseña' className="form-control cajas" onChange={event => setConfirmPass(event.target.value)} required />

            <button className="btnregistro" onClick={() => ChangePassword()}>Cambiar contraseña</button>
            <Modal.Footer>
              <Button className="btn btn-danger" onClick={handleClose}>Cerrar</Button>
              </Modal.Footer>
          </form>
            
        </Modal>
      </>
    )

  }

