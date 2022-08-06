import React, { useContext, useState } from "react";
import { faUser, faEnvelope, faCheck, faLock, faCalendar, faGuitar, faCamera, faComment} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/signup.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import config from "../config.js";
import Swal from "sweetalert2"
import App from "../pages/App"
import Terms from "../pages/termsCondition"
export const SignUp = () => {
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
                        window.location.href = "/login"
                    } else {
                        window.location.href = "/mainindex"
                    }
                })
            }        
        }).catch((error) => {
                    Swal.fire({
                        title: error.msg,
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
            <form onSubmit={signUp}>
                <div className="boxCard">
                    <center>
                        <img
                            src="./logo.png"
                            alt="profile-img"
                            className="profile-img-card"
                            width="350"
                            height="350"
                        />
                    </center>
                </div>
                       <h1 className="">Registro:</h1>
                        <input
                            type="text"
                            className="cajas"
                            placeholder="Nombre"
                            onChange={event => setName(event.target.value)}
                            required
                        />
                    
                    <input
                        type="text"
                        className="cajas"
                        placeholder="Apellido"
                        onChange={event => setLastName(event.target.value)}
                        required
                    />

               
                    <input
                        type="number"
                        className="cajas"
                        placeholder="Edad"
                        onChange={event => setAge(event.target.value)}
                        required
                    />
                    <input
                        type="text"
                        className="cajas"
                        placeholder="Nombre Artístico / Banda"
                        onChange={event => setArtist_name_or_band_name(event.target.value)}
                        required
                    />
                    <div>
                    <label className="me-1">
                        <strong>¿Eres una banda?</strong>
                    </label>
                        <input
                            type="checkbox"
                            checked={band}
                            onChange={()=>handleChange("band")}
                        />
                        </div>
                        <div>       
                    <label className="me-1">
                        <strong>¿Tienes Experiencia?</strong>
                    </label>
                        <input
                            type="checkbox"
                            checked={experience}
                            onChange={()=>handleChange("experience")}
                        />
                    </div>
                    <div className="mt-2">
                    <label>
                    <h6>  <FontAwesomeIcon icon={faCamera} /> Elige tu foto de perfil</h6> </label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={event => setAvatar(event.target.files[0])}
                            required
                        />                  
                    </div>
                    <div className="mt-3">
                    <input
                        type="textarea"
                        className="cajas"
                        placeholder="Escribe sobre ti..."
                        onChange={event => setDescription(event.target.value)}
                        required
                    />
                    </div>
                    <input
                        type="email"
                        className="cajas"
                        placeholder="Email"
                        onChange={event => setEmail(event.target.value)}
                        required
                    />

                    <input
                        type="password"
                        className="cajas"
                        placeholder="Contraseña"
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="cajas"
                        placeholder="Confirma Contraseña"
                        onChange={event => setConfirmPass(event.target.value)}
                    />               
                <p className="termino1"><input type="checkbox" required/> Estoy de acuerdo con <a href="#" ><Terms /></a></p>
                <button type="submit" className="btnregistro">
                    Registrar!
                </button>
                <p className="tengo-cuenta pb-5"><a className="tengo-cuenta">Ya tengo cuenta  <button className="btn btn-dark" type="button"><App /></button></a></p>

            </form>
        </div>
    );
};