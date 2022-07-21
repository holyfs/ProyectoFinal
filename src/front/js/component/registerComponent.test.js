import React, { useContext, useState } from "react";
//import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const SignUpTest = () => {
	//const { store, actions } = useContext(Context);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [artist_name_or_band_name, setArtist_name_or_band_name] = useState("");
    const [experience, setExperience] = useState(false);
    const [band, setBand] = useState(false);
    const [avatar, setAvatar] = useState("");
	let history = useNavigate();

	async function signUp(event) {
		event.preventDefault();

		if (password !== confirmPass) {
			alert("Las constraseñas no coinciden");
			return;
		}
		const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
			method: "POST",
			headers: {
				"Content-type": "multipart/form-data",
                 "mode": 'no-cors'
			},
			body: JSON.stringify({
                name: name,
                last_name: lastName,
				email: email,
				password: password,
                age: age,
                description: description,
                artist_name_or_band_name: artist_name_or_band_name,
                experience: experience,
                band: band,
                avatar: avatar,

				is_active: true
			})
		});
		console.log(response);
		const responseJson = await response.json();
		history("/login");
		return responseJson;
	}

	return (
		<div className="container">
			<h1>SIGN UP</h1>
			<form onSubmit={signUp}>
			
        <div className="card card-container">
        <center>
          <img
            src="https://st2.depositphotos.com/3854637/47799/v/600/depositphotos_477992494-stock-illustration-profile-of-a-young-woman.jpg"
            alt="profile-img"
            className="profile-img-card"
            width="250"
			height="250"
          />
        </center>
		</div>
            <div className="form-group">
                <label>
                    Name:
					<input
						type="text"
						className="form-control"
						placeholder="Name"
						onChange={event => setName(event.target.value)}
						required
					/>
                </label>
				</div>
                <div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="Last Name"
						onChange={event => setLastName(event.target.value)}
						required
					/>
				</div>
                <div className="form-group">
					<input
						type="number"
						className="form-control"
						placeholder="Age"
						onChange={event => setAge(event.target.value)}
						required
					/>
				</div>
                <div className="form-group">
					<input
						type="text"
						className="form-control"
						placeholder="Name of Band/Artist"
						onChange={event => setArtist_name_or_band_name(event.target.value)}
                        required
					/>
				</div>
                <div className="form-group">
                <label>
                    ¿Eres una banda?
					<input
						type="checkbox"
						className="form-control"
						//onChange={event => setBand(event.target.value)}
					/>
                </label>
                </div>
                <div className="form-group">
                <label>
                    ¿Tienes Experiencia?
					<input
						type="checkbox"
						className="form-control"
						//onChange={event => setExperience(event.target.value)}
					/>
                </label>
                <div className="form-group">
                <label>
                    <h4>Elige tu foto de perfil</h4>
					<input
						type="file"
						className="form-control"
						onChange={event => setAvatar(event.target.value)}
                        required
					/>
                </label>
				</div>
                </div>
                <div className="form-group">
					<input
						type="textarea"
						className="form-control"
						placeholder="Your Description"
						onChange={event => setDescription(event.target.value)}
                        required
					/>
				</div>
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
				<div className="form-group">
					<input
						type="password"
						className="form-control"
						placeholder="password confirmation"
						onChange={event => setConfirmPass(event.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Register!
				</button>
			</form>
		</div>
	);
};