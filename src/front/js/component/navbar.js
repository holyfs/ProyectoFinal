import React, { useState } from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import App from "../pages/App"
import Signup from "../component/signup"
import "../../styles/navBar.css"
import {Login} from "../component/login.component"
import LoginModal from "../component/login"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import MuiAlert from "@material-ui/lab/Alert";
import Swal from "sweetalert2"


export const Navbar = () => {
	const [showLoginModal, setShowLoginModal]     = useState(false);
  const handleShowLoginModal = () => {
    setShowLoginModal(!showLoginModal); 
  }
  
  

  const logout = () => {
	Swal.fire({
		title: 'Se cerrará la sesión',
		buttonsStyling: false,
		customClass: {
			confirmButtonText: "Salir",
			confirmButtonColor: "#4c4",
			
		}
	})
			localStorage.removeItem('jwt-token');
			window.location.reload()
  };
	let tok = localStorage.getItem("jwt-token")
	let tokLogout = localStorage.getItem("jwt-token")
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
			{tokLogout==null?
			<Link to="/signup2">
			<button className="btn btn-dark" type="button">SingUp No modal</button>
			</Link>
			:
			<button className="btn btn-dark" type="button" onClick={logout}>Log Out</button>
			}
			
				
			  <LoginModal show={showLoginModal} close={handleShowLoginModal} />
      
        
          	<button className="btn btn-dark" type="button" onClick={handleShowLoginModal}>Login</button>
        
      		
			<button className="btn btn-dark" type="button"><App /></button>
					
				
					
          	<button className="btn btn-dark" type="button"><Signup /></button>
    			</form>
</div>
</nav>	
		
	);
};
