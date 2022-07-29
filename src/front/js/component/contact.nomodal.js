import React, { useState } from 'react';
import '../../styles/App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";

export const ContactNoModal = () => {
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

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
        msg: msg
      })
    });
    // necesitaria un RETURN aquí para enviar a bio y enviar un alert con "mensaje enviado"
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
        <div class="btn-check-log">
          <button type="submit" className="btn btn-dark" onClick={SendMsg()}>Enviar</button>
        </div>



        <div className="d-flex justify-content-end">
                        <form>
                            <a href="/bio:id">
                                <input type="button" value="Cerrar" />
                            </a>
                        </form>
                </div>



      </form>

      </>
    )
  }
