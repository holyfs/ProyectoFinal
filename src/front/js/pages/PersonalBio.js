import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Contact from "../component/contact";
import '../../styles/bio.css';
import { Context } from "../store/appContext";
import ChangePassword from "../component/ChangePassword";
import { Images } from "./galeriaImagenes";
import { useNavigate } from 'react-router-dom';
import AddMusicalGenre from "../component/AddMusicalGenre.js";
import AddMusicalInstruments from "../component/AddMusicalInstruments.js";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import axios from "axios";


export const PersonalBio = () => {
    let navigate = useNavigate();
    const [usuarios, setUsuarios]= useState([]);
    const [experience, setExperience] = useState(false);
    const [band, setBand] = useState(false);
	const { store, actions } = useContext(Context);
	const [data, setData] = useState(" ");
    const protectedData = async () => {
		// retrieve token form localStorage
        
		const token = localStorage.getItem("jwt-token");
		const response = await fetch("https://3001-holyfs-proyectofinal-zmvgflr5rep.ws-eu54.gitpod.io" + "/api/private", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + token
			}
		});
		if (!response.ok) throw Error("There was a problem in the login request");
       
		const responseJson = await response.json();
		setData(responseJson);
	};
//Debemos averiguar como conseguir el Id del usuario al que tiene que entrar despues de hacer fetch a private
    const getUserDataById = async () => {
    await axios.get("https://3001-holyfs-proyectofinal-zmvgflr5rep.ws-eu54.gitpod.io/api/user/1")
    .then(response=>{
    setUsuarios(response.data);
      setTablaUsuarios(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

	useEffect(() => {
        let prueba = localStorage.getItem("jwt-token")
		if (prueba === null) navigate("/rederictsignup");
		else protectedData();
        getUserDataById();
	}, []);

/*     let user_name = 'Slipknot'
    let user_nick_name = 'Slipknot'
    let band_name = "Slipknot" */

    let guardar_cambios = () => {
        
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <h1 className="bioperfil">{usuarios.artist_name_or_band_name}</h1>
                    </div>
                    <div className="d-flex justify-content-end">
                        <form>
                            <a href="/images">
                                <input type="button" value="Galería de Imágenes" />
                            </a>
                        </form>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <img className="rounded-circle" width="250px" height="250px" src={usuarios.avatar}></img>
                    </div>
                    <div className="col-3">
                        <h3 className="PersonalDates">Datos Personales</h3>
                        <div className="userName" id="userName" contenteditable="true" >{usuarios.name}</div>
                        <div className="LastName" id="LastName" contenteditable="true">{usuarios.last_name} </div>
                        <div className="age" id="age" contenteditable="true">{usuarios.age} </div>
                        <div className="email" id="email" contenteditable="false">{usuarios.email} </div>
                        <button>***changepassword component</button>
                        <div className="form-group">
                    <label>
                        ¿Eres una banda?
                        <input
                            type="checkbox"
                        onChange={event => setBand(event.target.value)}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        ¿Tienes Experiencia?
                        <input
                            type="checkbox"
                        onChange={event => setExperience(event.target.value)}
                        />
                    </label>
                </div>
                    </div>
                </div>
                <div>Cambiar Foto de Perfil</div>
                <input
                            type="file"
                            className="form-control"
                            onChange={event => setAvatar(event.target.files[0])}
                        />
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <h4>Generos</h4>
                        <div><AddMusicalGenre /></div>
                        <h4>Instrumentos</h4>
                        <div><AddMusicalInstruments /></div>
                    </div>

                    <div className="col-1">

                    </div>
                    <label className="col-6">
                        <div className="description" id="description" contenteditable="true">{usuarios.description}</div>
                    </label>
                </div>

            </div>

            <button onClick={guardar_cambios()}>Guardar Cambios</button>

        </>

    )
}