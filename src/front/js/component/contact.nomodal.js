import React, { useState } from 'react';
import '../../styles/App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import config from '../config';
import Swal from "sweetalert2";


export const ContactNoModal = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  let id = window.location.href.split(":")[2]


  const SendMsg = () => {
    /* fetch(config.hostname + "/sendMsg", {
      method: "PUT",
      headers: {
        "Content-type": "multipart/form-data",
      },
      body: ({
        email: email,
        name: name,
        phone: phone,
        msg: msg
      })
    });
    */
    Swal.fire({
      icon: 'sucess',
      title: 'Mensaje Enviado',
      confirmButtonText: 'Volver a pagina del artista',
      confirmButtonColor: 'rgb(25, 169, 149)',
    }).then((result) => {
      if (result.value) {
          window.location.href = "/bio:"+id
      } else {
          window.location.href = "/mainindex"
      }
    })
  }


  return (
    <>
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
        <div className="d-flex justify-content-center mt-3 mb-2" >
          <button onClick={() => SendMsg()}>Enviar</button>
        </div>



        <div className="d-flex justify-content-end">
          <form>
            <a href={"/bio:" + id}>
              <input type="button" value="Cerrar" />
            </a>
          </form>
        </div>



      </form>

    </>
  )
}
