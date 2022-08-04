import React, { useContext, useState } from "react";
import { faUser, faEnvelope, faCheck, faLock, faCalendar, faGuitar, faCamera, faComment} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";
import UploadImage from "../component/uploadImage";
import { resetWarningCache } from "prop-types";
import { Link } from "react-router-dom";
import config from "../config.js";
import Swal from "sweetalert2"
import App from "../pages/App"
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
        fetch(config.hostname + "/api/signup", {
            method: "POST",
            headers: {
                /*  "Content-Type": "multipart/form-data", */
                "mode": 'no-cors'
            },
            body: newRequest
        }).then((response) => {
            return response.json()
        }).then((response) => {
            if (response.msg) {
                Swal.fire({
                    title: response.msg,
                    confirmButtonText: 'ok',
                    confirmButtonColor: 'rgb(25, 169, 149)',
                })
                return;
            } else {
                Swal.fire({
                    title: 'Registro Completo',
                    confirmButtonText: 'Quieres hacer login?',
                    confirmButtonColor: 'rgb(25, 169, 149)',
                }).then((result) => {
                    if (result.value) {
                        window.location.href = "/loginmensaje"
                    } else {
                        window.location.href = "/mainindex"
                    }
                })
            }        
        }).catch((error) => {
                    Swal.fire({
                        title: 'Error al hacer registro',
                        confirmButtonText: 'ok',
                        confirmButtonColor: 'rgb(25, 169, 149)',
                    })
                    console.log("error login")
                }) 
                         
    }
    const handleChange = (changeType) => {
        if (changeType === "band"){
            setBand(!band);
        }else {
            setExperience(!experience)
        } 
        
      };
    return (
        <div className="form">
            <h1 className="titulo">SIGN UP</h1>
            <form onSubmit={signUp}>
                <div className="boxCard">
                    <center>
                        <img
                            src="https://st2.depositphotos.com/3854637/47799/v/600/depositphotos_477992494-stock-illustration-profile-of-a-young-woman.jpg"
                            alt="profile-img"
                            className="profile-img-card"
                            width="395"
                            height="258"
                        />
                    </center>
                </div>
            <br></br>
            
                    <label>
                    <FontAwesomeIcon icon={faUser} />
                       <strong> Nombre:</strong>
                        <input
                            type="text"
                            className="cajas"
                            placeholder="Name"
                            onChange={event => setName(event.target.value)}
                            required
                        />
                    </label>
            
                
                    <label>
                    <FontAwesomeIcon icon={faUser} /><strong>Apellido:</strong>
                    
                    <input
                        type="text"
                        className="cajas"
                        placeholder="Last Name"
                        onChange={event => setLastName(event.target.value)}
                        required
                    />
                    </label>
                <label>
                    <FontAwesomeIcon icon={faCalendar} />
                    <strong>Edad:</strong>
               
                    <input
                        type="number"
                        className="cajas"
                        placeholder="Age"
                        onChange={event => setAge(event.target.value)}
                        required
                    />
            
                </label>
                <label>
                <FontAwesomeIcon icon={faGuitar} />
                <strong>Nombre de artista/Banda:</strong>
                    <input
                        type="text"
                        className="cajas"
                        placeholder="Name of Band/Artist"
                        onChange={event => setArtist_name_or_band_name(event.target.value)}
                        required
                    />
                </label>
                    <label>
                        <strong>¿Eres una banda?</strong>
                        <input
                            type="checkbox"
                            checked={band}
                            onChange={()=>handleChange("band")}
                        />
                    </label>
            
            <br></br>
        
                    <label>
                        <strong>¿Tienes Experiencia?</strong>
                        <input
                            type="checkbox"
                            checked={experience}
                            onChange={()=>handleChange("experience")}
                        />
                    </label>
    
                <br></br>
                <br></br>
                
                    <label>
                    
                        <h4><FontAwesomeIcon icon={faCamera} />Elige tu foto de perfil</h4>
                        <input
                            type="file"
                            className="form-control"
                            onChange={event => setAvatar(event.target.files[0])}
                            required
                        />
                    </label>
                    <label>
                    <FontAwesomeIcon icon={faComment} />
                    <strong>Escribe sobre ti:</strong>
                    <input
                        type="textarea"
                        className="cajas"
                        placeholder="Your Description"
                        onChange={event => setDescription(event.target.value)}
                        required
                    />
                    </label>
                    <label>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <strong>Email:</strong>
                    <input
                        type="email"
                        className="cajas"
                        placeholder="email"
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                    </label>
                    <label
                    ><FontAwesomeIcon icon={faLock} />
                    <strong>Contraseña:</strong>
                    <input
                        type="password"
                        className="cajas"
                        placeholder="password"
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                    </label>
                    <label
                    ><FontAwesomeIcon icon={faLock} />
                    <strong>Confirma Contraseña:</strong>
                    <input
                        type="password"
                        className="cajas"
                        placeholder="password confirmation"
                        onChange={event => setConfirmPass(event.target.value)}
                    />
                    </label>
                
                <p className="termino1"><input type="checkbox" required/>&nbsp; <FontAwesomeIcon icon={faCheck} />Estoy de acuerdo con <a className="termino2" href="">Terminos y Condiciones</a></p>
                <button type="submit" className="btnregistro">
                    Register!
                </button>
                <p className="tengo-cuenta"><a className="tengo-cuenta">Ya tengo cuenta <button className="btn btn-dark" type="button"><App /></button></a></p>

            </form>
        </div>
    );
};