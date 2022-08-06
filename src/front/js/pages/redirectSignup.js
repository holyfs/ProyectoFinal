import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/bio.css';

export const Redirect = () => {

    
    return (
    <>
        <h1>ZONA SOLO PARA USUARIOS</h1>
        <p>Por favor registrate pinchando <strong><Link to="/signup2">aquí</Link></strong></p>
        <p>Si ya eres usuario inicia sesión pinchando <strong><Link to="/login">aquí</Link></strong></p>
    </>   
    
)
}

