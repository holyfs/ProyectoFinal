import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import App from "../pages/App"
import Signup from "../component/signup"
import Login from "../component/login"


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
  <button type="button" class="btn btn-info dropdown-toggle" data-bs-toggle="dropdown">🔈</button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Samsung</a></li>
    <li><a class="dropdown-item" href="#">LG</a></li>
  </ul>

  <div class="btn-group">
    <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown">Mobile Phones</button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Android</a></li>
      <li><a class="dropdown-item" href="#">Iphone</a></li>
    </ul>

   </div>
</div>
          
    			</form>
</div>
</nav>	
		
	);
};
