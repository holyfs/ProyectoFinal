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
import Swal from "sweetalert2"
import axios from "axios";


export const PersonalBio = () => {
    let navigate = useNavigate();
    const [usuarios, setUsuarios]= useState([]);
    const [userGenre, setUserGenres]= useState([]);
    const [userInstruments, setUserInstruments]= useState([]);
    const [experience, setExperience] = useState();
    const [band, setBand] = useState();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [artist_name_or_band_name, setArtist_name_or_band_name] = useState("");
    const [avatar, setAvatar] = useState("");
    const [id, setId] = useState("");
	const { store, actions } = useContext(Context);
	const [data, setData] = useState(" ");
    const protectedData = async () => {
		// retrieve token form localStorage
        
		const token = localStorage.getItem("jwt-token");
		const response = await fetch("https://3001-holyfs-proyectofinal-5zwcb1ywnhe.ws-eu54.gitpod.io" + "/api/private", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": token
			}
		}).then(response=>{
        if (!response.msg=="ok") throw Error("There was a problem in the login request");
       
		const responseJson = response.json();
		setData(responseJson)
    });
		
	};
    const user_id = localStorage.getItem("user_id")
//Debemos averiguar como conseguir el Id del usuario al que tiene que entrar despues de hacer fetch a private
    const getUserDataById = async () => {
    await axios.get(`https://3001-holyfs-proyectofinal-5zwcb1ywnhe.ws-eu54.gitpod.io/api/user/${user_id}`)
    .then(response=>{
    setUsuarios(response.data.user);
    setUserGenres(response.data.genres);
    setUserInstruments(response.data.instruments);
//      setTablaUsuarios(response.data);
        console.log(response)
     /*  setAge(response.data.age);
      setName(response.data.name);
      setLastName(response.data.last_name);
      setDescription(response.data.description);
      setArtist_name_or_band_name(response.data.artist_name_or_band_name);
      setAvatar(response.data.avatar);*/
      setId(response.data.id) 
    }).catch(error=>{
      console.log(error);
    })
    };
    const putUser = async() => {
        let newRequest = new FormData();
        newRequest.append("id", id)
        newRequest.append("name", name)
        newRequest.append("last_name", lastName)
        newRequest.append("age", age)
        newRequest.append("description", description)
        newRequest.append("artist_name_or_band_name", artist_name_or_band_name)
        newRequest.append("experience", experience)
        newRequest.append("band", band)
        newRequest.append("file", avatar)
        const response = await fetch("https://3001-holyfs-proyectofinal-l3b0jsgpj2x.ws-eu54.gitpod.io" + "/api/user", {
            method: "PUT",
            headers: {
                "mode": 'no-cors',
                "Authorization": "Bearer " + token
            },
            body: newRequest

        });;
        request.send(formData);
        const responseJson = await response.json();
        Swal.fire({
            icon: 'sucess',
            title: 'Registro Completo',
            text: 'Everything went good!',
            footer: '<a href="/login">Quieres Iniciar sesión?</a>'
          })
        return responseJson;
       
    }

	useEffect(() => {
        let prueba = localStorage.getItem("jwt-token")
		if (prueba === null) navigate("/rederictsignup");
		else protectedData();
        getUserDataById();
	}, []);

    const handleChange = (changeType) => {
        if (changeType === "band"){
            setBand(!band);
        }else {
            setExperience(!experience)
        } 
    }
    let guardar_cambios = () => {
        putUser()
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-6 offset-3">
                        <h1 className="bioperfil" onChange={event => setArtist_name_or_band_name(event.target.value)}>{usuarios.artist_name_or_band_name}</h1>
                    </div>
                    <div className="d-flex justify-content-end">
                        <form>
                            <a href="/images">
                                <input type="button" value="Galería de Imágenes" />
                            </a>
                        </form>
                    </div>
                </div>
            

                <div className="row">
                    <div className="col-3 d-flex justify-content-center" >
                        <img className="rounded-circle" width="350px" height="350px" src={usuarios.avatar}></img>
                    </div>
                    <div className="col-5">
                        <h3 className="PersonalDates">Datos Personales</h3>
                        <div className="row">
                            <span className="col-4"><strong>Nombre:</strong> {usuarios.name}</span>
                            <input className="col-8" id="userName" onChange={event => setName(event.target.value)} />
                        </div>
                        <div className="row">
                            <span className="col-4"><strong>Apellido:</strong> {usuarios.last_name}</span>
                            <input className="col-8" id="LastName" onChange={event => setLastName(event.target.value)} />
                        </div>
                        <div className="row">
                            <span className="col-4"><strong>Edad:</strong> {usuarios.age}</span>
                            <input className="col-8" id="age" onChange={event => setAge(event.target.value)} />
                        </div>
                        <div className="col-4" id="email" contentEditable="false"><strong>email:</strong> {usuarios.email}</div>
                        <button>***changepassword component</button>
                        <div className="form-group">
                            <label>
                                ¿Eres una banda?
                                <input
                                    type="checkbox"
                                    checked={usuarios.band}
                                    onChange={()=>handleChange("band")}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                ¿Tienes Experiencia?
                                <input
                                    type="checkbox"
                                    checked={usuarios.experience}
                                    onChange={()=>handleChange("experience")}
                                />
                            </label>
                        </div>
                    </div>
                </div>
               {/*  <div className="row col-4 offset-3">Cambiar foto de perfil</div>
                <div className="row col-4 offset-3">
                    <input
                        type="file"
                        className="form-control"
                        onChange={event => setAvatar(event.target.files[0])}

                    />
                </div> */}


                <div className="row">
                    <div className="col-3">
                        <div className="d-flex justify-content-center">Cambiar foto de perfil</div>
                        <div className="d-flex justify-content-center">
                            <input
                                type="file"
                                className="form-control"
                                onChange={event => setAvatar(event.target.files[0])}

                            />
                        </div>
                    </div>
                    <div className="col-5">
                        <label ><strong>Descripción:</strong> </label>
                        <div className="mb-3" id="description">{usuarios.description}</div>
                        <label className="mb-2" ><strong>Generos:</strong>{userGenre.map((genre) => genre.label)}</label>
                        <div><AddMusicalGenre userGenre={userGenre}/></div>
                        <label className="mb-2" ><strong>Instrumentos:</strong> </label>
                        <div><AddMusicalInstruments /></div>
                        <div className="d-flex justify-content-center mt-3 mb-2" >
                        <button onClick={() => guardar_cambios()}>Guardar Cambios</button>
                        </div>
                        
                    </div>
                </div>
              {/*   <div className="row">
                    <label className="col-6">
                        <div className="description" id="description">{usuarios.description}</div>
                    </label>
                </div> */}


            
            </div>

        </>

    )
}