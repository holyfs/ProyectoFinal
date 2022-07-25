import React, { useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import App from "../pages/App"
import Signup from "../component/signup"
import "../../styles/navBar.css"
import {Login} from "../component/login.component"
import LoginModal from "../component/login"


export const Navbar = () => {
	const [showLoginModal, setShowLoginModal]     = useState(false);
  const handleShowLoginModal = () => {
    setShowLoginModal(!showLoginModal); 
  }
	let tok = localStorage.getItem("jwt-token")
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
				<Link to="/mainindex">
			<button className="btn btn-dark" type="button">Main Api</button>
		  	</Link>
				<form class="form-inline">
		  	{tok==null?
			<Link to="/login">
			<button className="btn btn-dark" type="button">Login no modal</button>
		  	</Link>
			:<Link to="/personalbio">
			<button className="btn btn-dark" type="button">Mi zona</button>
		  	</Link>}
				
			  <LoginModal show={showLoginModal} close={handleShowLoginModal} />
      
        
          	<button className="btn btn-dark" type="button" onClick={handleShowLoginModal}>Login</button>
        
      		
			<button className="btn btn-dark" type="button"><App /></button>
					
				
					
          	<button className="btn btn-dark" type="button"><Signup /></button>
    			</form>
</div>
</nav>	
		
	);
};
