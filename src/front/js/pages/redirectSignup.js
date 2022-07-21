import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Contact from "../component/contact";
import '../../styles/bio.css';
import { Context } from "../store/appContext";
import ChangePassword from "../component/ChangePassword";
import { Images } from "./galeriaImagenes";
import { useNavigate } from 'react-router-dom';

export const Redirect = () => {

    
    return (
    <>
        <h1>ZONA SOLO PARA USUARIOS</h1>
        <p>Por favor registrate pinchando <strong><Link to="/signup2">aquí</Link></strong></p>
        <p>Si ya eres usuario inicia sesión pinchando <strong><Link to="/login">aquí</Link></strong></p>
    </>   
    
)
}

