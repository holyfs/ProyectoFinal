import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import App from "../pages/App"
import Signup from "../component/signup"
import Login from "../component/login"
import "../../styles/navBar.css"


export const Navbar = () => {

	return (
		<nav className="navbar navbar-light Nav">
		<div className="container">
				<Link to="/">
				<span className="navbar-brand mb-0 h1">
					<img
						src="https://cdn.icon-icons.com/icons2/1052/PNG/256/256_folder_music_icon-icons.com_76633.png"
						width="90"
						height="60"
					/>
				</span>
				<Link to="/" className="navbar-brand fs-3 ubuntu">
				<span className="text-primary">Music</span>On Demand
        </Link>
        <style jsx>{`
          button[aria-expanded="false"] > .close {
            display: none;
          }
          button[aria-expanded="true"] > .open {
            display: none;
          }
        `}</style>
				</Link>
				<form class="form-inline">
				
					
						<button className="btn btn-dark" type="button"><App /></button>
					
				
					
          <button className="btn btn-dark" type="button"><Signup /></button>
    			</form>
</div>
</nav>	
		
	);
};
