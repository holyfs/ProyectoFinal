
import React, { useState, Component  } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import App from "../pages/App"
import Signup from "../component/signup"
import "../../styles/navBar2.css"
import {Login} from "../component/login.component"
import Swal from "sweetalert2"
import face from "../../img/home.png";

export const Footer = () => {
   
    return (
    <div>
    
        <nav>
        <ul className="fancyNav image3">
		<li>🅼🅰🅳🅴 🆆🅸🆃🅷 <i className="fa fa-heart text-danger" /> 🅱🆈 🅰🆈🅾🆉🅴, 🅴🅻🆈 🆈 🅰🅽🅶🅴🅻</li>
        </ul>
        </nav>
    </div>
    );

};