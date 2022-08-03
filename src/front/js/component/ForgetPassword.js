import React, { useState } from 'react';
import '../../styles/App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import config from '../config';
import Swal from "sweetalert2";

export const ForgetPassword = () => {

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
            window.location.href = "/forgetpassword"
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


      <form className="seminor-login-form">
        <div className="form-group">
          <input type="email" className="form-control" required autocomplete="off" onChange={event => setEmail(event.target.value)} />
          <label className="form-control-placeholder" for="name">Email address</label>
        </div>
      </form>
      <div className="d-flex justify-content-center mt-3 mb-2" >
        <button onClick={() => SendPass()}>Enviar Contraseña</button>
      </div>

      <form>
        <a href={"/mainindex"}>
          <input type="button" value="Cerrar" />
        </a>
      </form>


    </>
  )
}
