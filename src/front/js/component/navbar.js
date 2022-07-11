import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import App from "../pages/App"
import Signup from "../component/signup"


export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
		<div className="container">
				<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<img
						src="https://w7.pngwing.com/pngs/230/738/png-transparent-musical-note-logo-musical-theatre-musical-note-text-logo-musical-notation.png"
						width="60"
						height="40"
					/>
				</span>
				</Link>
				<form class="form-inline">
				
					<Link to="#">
						<button className="btn btn-primary"><App /></button>
					</Link>
				
					
          <button data-toggle="modal" data-target="#exampleModal" className="btn btn-primary" 
          type="button"><Signup /></button>
          <div class="btn-group">
              <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" 
              aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-cog"></i>
              </button>
              <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#">Accion</a>
                  <a class="dropdown-item" href="#">Otra accion</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Cerrar sesión</a>
              </div>
          </div>
      </form>
			</div>
	</nav>	
		
	);
};
