import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Terms() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <a onClick={handleShow}>
        <strong>Términos y Condiciones</strong>
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>FaceMusicApp</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Qué permito cuando doy mi consentimiento a los términos y condiciones en Internet?
Das permiso para la utilización, almacenamiento o análisis de:
tu información personal
tus datos bancarios o los de tus tarjetas de crédito
tus imágenes
tus videos
tus “me gusta”
tus visitas en las páginas de Internet
¿Por qué es importante leer los términos y condiciones?
Porque en los términos y condiciones se establece lo que van a hacer con tu información personal.

También te informan sobre los siguientes puntos:

para qué se van a utilizar tus datos,
si tus datos se van a compartir con otras personas,
las medidas de seguridad que van a tener tus datos,
dónde se van a guardar tus datos,
dónde podés hacer reclamos y hacer valer tus derechos,
cómo van a cuidar tu privacidad y tus derechos,
qué responsabilidades asume la empresa respecto a los servicios que presta.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Terms;