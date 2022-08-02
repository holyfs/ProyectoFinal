import React, { useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import App from "../pages/App"
import Signup from "../component/signup"
import "../../styles/navBar.css"
import {Login} from "../component/login.component"
import Swal from "sweetalert2"


export const Navbar = () => {
	
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
		<nav className="navbar navbar-light Nav">
		<div className="container">
			<div className="row">
				<div  className="col">
				<Link to="/">
				<span className="navbar-brand mb-0 h1 contenedor imagen">
					<img
						src="https://cdn.icon-icons.com/icons2/1052/PNG/256/256_folder_music_icon-icons.com_76633.png"
						width="90"
						height="60"
						align="left"
					/>
					<a href=""><img src="https://fontmeme.com/permalink/220802/7b8c462e600cd808c123f8ab40fd0ec4.png" alt="efecto-sombra" border="0" className="image10 image3"/></a>
				</span>
				</Link>
				
				</div>
				
				
				
			</div>
	
				<form className="form-inline">
		  	{tok==null?
			<button className="btn btn-dark" type="button"><App /></button>
			:<Link to={`/personalbio:${user_id}`}>
			<button className="btn btn-dark" type="button">Mi zona</button>
		  	</Link>}
			{tokLogout==null?
			<Link to="/signup2">
			<button className="btn btn-dark" type="button">SingUp No modal</button>
			</Link>
			:
			<button className="btn btn-dark" type="button" onClick={logout}>Log Out</button>
			}
					
          	<button className="btn btn-dark" type="button"><Signup /></button>
    			</form>
</div>
</nav>	
		
	);
};
