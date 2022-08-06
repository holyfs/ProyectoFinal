import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import App from "../pages/App"
import "../../styles/navBar2.css"
import "../../styles/navBar.css"
import Swal from "sweetalert2"
import Logo from "../../img/logo.png";


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
        <form className="form-inline">
    
        <nav className="">
        <ul className="fancyNav image3">
            <Link to ="/">
            <li id="about" type="button"><a>🅸🅽🅸🅲🅸🅾<b>🎧</b></a></li>
            </Link>
            
            <li id="about" type="button"><a>
            {tok==null?
			<App />
			:<Link to={`/personalbio:${user_id}`}>
			🅼🅸 🆉🅾🅽🅰🎤
		  	</Link>}</a></li>
            
            <li id="about"><a type="button">
            {tokLogout==null?
			<Link to="/signup">
			🆂🅸🅶🅽🆄🅿🔔
			</Link>
			:
			<a type="button" onClick={logout}>🅻🅾🅶🅾🆄🆃🔇</a>
			}</a></li>
        </ul>
        </nav>
        <center>
        <a href="/"><img className="image3" src={Logo} width="250"
                            height="250"/></a>
        </center>
        </form>
    );

};