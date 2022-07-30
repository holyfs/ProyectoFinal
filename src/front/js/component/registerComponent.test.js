import React, { useContext, useState } from "react";
//import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import UploadImage from "../component/uploadImage";
import { resetWarningCache } from "prop-types";
import { Link } from "react-router-dom";
import config from "../config.js";
import Swal from "sweetalert2"
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
    const [experience, setExperience] = useState("");
    const [band, setBand] = useState("");
    const [avatar, setAvatar] = useState("");
    const navigate = useNavigate();
    function signUp(event) {
        event.preventDefault();
        if (password !== confirmPass) {
            Swal.fire({
                icon: 'sucess',
                title: "Las contraseñas no coinciden",
                confirmButtonText:'ok',
                confirmButtonColor: 'rgb(25, 169, 149)',
              })
            return;
        }
        let newRequest = new FormData();
        newRequest.append("name", name)
        newRequest.append("last_name", lastName)
        newRequest.append("email", email)
        newRequest.append("password", password)
        newRequest.append("age", age)
        newRequest.append("description", description)
        newRequest.append("artist_name_or_band_name", artist_name_or_band_name)
        newRequest.append("experience", String(experience))
        newRequest.append("band", String(band))
        newRequest.append("file", avatar)
        newRequest.append("is_active", true)
        const response = await fetch(config.hostname + "/api/signup", {
            method: "POST",
            headers: {
                /*  "Content-Type": "multipart/form-data", */
                "mode": 'no-cors'
            },
            body: newRequest
        });;
        const responseJson = await response.json();
        Swal.fire({
            icon: 'sucess',
            title: 'Registro Completo',
            confirmButtonText:'Quieres hacer login?',
            confirmButtonColor: 'rgb(25, 169, 149)',
          }).then((result) => {
            if (result.value) {window.location.href = "/loginmensaje"
            }else{window.location.href = "/mainindex"

            }
          })
        return responseJson;       
    }
    const handleChange = (changeType) => {
        if (changeType === "band"){
            setBand(!band);
        }else {
            setExperience(!experience)
        } 
        
      };
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
                <br></br>
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
                <br></br>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={event => setLastName(event.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Age"
                        onChange={event => setAge(event.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name of Band/Artist"
                        onChange={event => setArtist_name_or_band_name(event.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <label>
                        ¿Eres una banda?
                        <input
                            type="checkbox"
                            checked={band}
                            onChange={()=>handleChange("band")}
                        />
                    </label>
                </div>
                <br></br>
                <div className="form-group">
                    <label>
                        ¿Tienes Experiencia?
                        <input
                            type="checkbox"
                            checked={experience}
                            onChange={()=>handleChange("experience")}
                        />
                    </label>
                </div>
                <br></br>
                <div className="form-group">
                    <label>
                        <h4>Elige tu foto de perfil</h4>
                        <input
                            type="file"
                            className="form-control"
                            onChange={event => setAvatar(event.target.files[0])}
                            required
                        />
                    </label>
                    <br></br>
                </div>
                <br></br>
                <div className="form-group">
                    <input
                        type="textarea"
                        className="form-control"
                        placeholder="Your Description"
                        onChange={event => setDescription(event.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email"
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password confirmation"
                        onChange={event => setConfirmPass(event.target.value)}
                    />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">
                    Register!
                </button>
            </form>
        </div>
    );
};