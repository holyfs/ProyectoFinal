import React, { useContext, useState, Component } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import { useAlert } from 'react-alert'
import ForgetPass from "./ForgetPassword"
import { Link } from "react-router-dom";
import Swal from "sweetalert2"
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "../../styles/home.css";
import ForgetPassword from "./ForgetPassword";
export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);

	const navigate = useNavigate();

	async function login(event) {
		event.preventDefault();
		const response = await fetch(process.env.BACKEND_URL + "/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		if (!response.ok) throw Error("There was a problem in the login request");
		alert("Las contraseñas no coinciden");

		if (response.status === 401) {
			throw "Invalid credentials";
		}if (response.status === 404) {
			alert("Credenciales no son correctas");
				throw "Invalid credentials";
		} else if (response.status === 400) {
			throw "Invalid email or password format";
		}
		const data = await response.json();
		// save your token in the localStorage
		//also you should set your user into the store using the setStore function
		localStorage.setItem("jwt-token", data.token);
		actions.setUser_token(data.token);
		Swal.fire({
            icon: 'sucess',
            title: 'Login Completo',
            text: 'Gracias por usar esta página web ',
            footer: '<a href="/personalbio">Quieres ir a tu página personal?</a>'
          })
    console.log(data)
	}

	return (
		<div className="container">
			<h1>Log in</h1>
			<div className="card card-container">
        <center>
          <img
            src="https://pbs.twimg.com/profile_images/897355385/cabeza-avatar.gif"
            alt="profile-img"
            className="profile-img-card"
            width="250"
			      height="250"
          />
        </center>
		</div>
			<form onSubmit={login}>
				<div className="form-group">
					<input
						type="email"
						className="form-control"
						placeholder="email"
						onChange={event => setEmail(event.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="password"
						onChange={event => setPassword(event.target.value)}
						required
					/>
				</div>
				<p className="forgot-password text-right">
                    Olvidé mi clave<i className="glyphicon glyphicon-cloud"> :( </i> <ForgetPass />
                </p>
				<button type="submit" className="btn btn-primary">
					Login
				</button>
			</form>
		</div>
	);
};