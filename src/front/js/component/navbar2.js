import React, { useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import App from "../pages/App"
import Signup from "../component/signup"
import "../../styles/navBar2.css"
import {Login} from "../component/login.component"
import Swal from "sweetalert2"
import face from "../../img/home.png";

export const Navbar2 = () => {
    const logout = () => {
        Swal
        .fire({
            title: "LogOut",
            input: "Desea Cerrar sesión?",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        })
        .then((resultado) => {
            console.log(resultado)
            if (resultado.dismiss!='cancel') {
                localStorage.removeItem('jwt-token');
                localStorage.removeItem('user_id');
                window.location.href='/';
    
                
            }else {
                // Dijeron que no
                return "Te mantienes logueado";
            }
            
        });
    
                
          };

    let user_id = localStorage.getItem("user_id")
	let tok = localStorage.getItem("jwt-token")
	let tokLogout = localStorage.getItem("jwt-token")

    return (

        <nav>
        <ul className="fancyNav">
            <li id="home"><a href="#home"><img src={face} /></a></li>
            <li id="news"><a href="#news">News</a></li>
            <li id="about"><a href="#about">About us</a></li>
            <li id="services"><a href="#services">Services</a></li>
            <li id="contact"><a href="#contact">Contact us</a></li>
        </ul>
        </nav>
    );

};