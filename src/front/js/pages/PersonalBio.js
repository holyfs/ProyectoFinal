import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Contact from "../component/contact";
import '../../styles/bio.css';
import { Context } from "../store/appContext";
import {ChangePassword} from "../component/ChangePassword";
import { useNavigate } from 'react-router-dom';
import AddMusicalGenre from "../component/AddMusicalGenre.js";
import AddMusicalInstruments from "../component/AddMusicalInstruments.js";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import Swal from "sweetalert2"
import axios from "axios";
import config from "../config.js";
import { faWindowMinimize } from "@fortawesome/free-regular-svg-icons";
import { faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const PersonalBio = (props) => {
    let navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [userGenre, setUserGenres] = useState(null);
    const [userInstruments, setUserInstruments] = useState(null);
    const [experience, setExperience] = useState(false);
    const [band, setBand] = useState(false);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [age, setAge] = useState("");
    const [description, setDescription] = useState("");
    const [artist_name_or_band_name, setArtist_name_or_band_name] = useState("");
    const [avatar, setAvatar] = useState("");
    const [id, setId] = useState("");
    const [edit, setEdit] = useState(false);
    const [genreSelected, setGenreSelected] = useState("");
    const [instrumentSelected, setInstrumentSelected] = useState("");
    const { store, actions } = useContext(Context);
    const [data, setData] = useState(" ");
    const protectedData = async () => {
        // retrieve token form localStorage

        const token = JSON.parse(localStorage.getItem("jwt-token"));
        const response = await fetch(config.hostname + "/api/private", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token.token
            }
        }).then(response => {
            if (!response.msg == "ok") throw Error("There was a problem in the login request");

            const responseJson = response.json();
            setData(responseJson)
        }).catch(error => {
            localStorage.removeItem('jwt-token');
            localStorage.removeItem('user_id');
            window.location.href = '/loginmensaje';
            console.log(error)

        });

    };
    const user_id = localStorage.getItem("user_id")
    const getUserDataById = async () => {
        await axios.get(`${config.hostname}/api/user/${user_id}`)
            .then(response => {
                setUsuarios(response.data.user);
                setUserGenres(response.data.genres);
                setUserInstruments(response.data.instruments);
                //      setTablaUsuarios(response.data);
                /*  setAge(response.data.age);
                 setName(response.data.name);
                 setLastName(response.data.last_name);
                 setDescription(response.data.description);
                 setArtist_name_or_band_name(response.data.artist_name_or_band_name);
                 setAvatar(response.data.avatar);*/
                setId(response.data.user.id)
            }).catch(error => {
                console.log(error);
            })
    };
    const putUser = async () => {
        const selectedGenres = formatGenresToCallApi(genreSelected)
        const selectedInstruments = formatGenresToCallApi(instrumentSelected)

        let newRequest = new FormData();
        newRequest.append("id", id)
        newRequest.append("name", name)
        newRequest.append("last_name", lastName)
        newRequest.append("age", age)
        newRequest.append("description", description)
        newRequest.append("artist_name_or_band_name", artist_name_or_band_name)
        newRequest.append("experience", "true" ? experience : "false")
        newRequest.append("band", "true" ? band : "false")
        newRequest.append("file", "avatar")
        newRequest.append("instruments", selectedInstruments)
        newRequest.append("genres", selectedGenres)
        const token = JSON.parse(localStorage.getItem("jwt-token"));
        const response = await fetch(config.hostname + "/api/user", {
            method: "PUT",
            headers: {
                "mode": 'no-cors',
                "Authorization": "Bearer " + token.token
            },
            body: newRequest

        });;
        const responseJson = await response.json();
        Swal.fire({
            icon: 'sucess',
            title: 'Actualizacion Completada',
            
        }).then((response)=>{
            window.location.href='/personalbio:'+ id
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
        if (changeType === "band") {
            setBand(!band);
        }if (changeType === "edit"){
            setEdit(!edit)
        }else if (changeType === "experience"){
            setExperience(!experience)
        }
        
    }
    let guardar_cambios = () => {
        putUser()
    }


      const changePic=()=>{
        const { value: file } = Swal.fire({
            title: 'Select image',
            input: 'file',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            inputAttributes: {
              'accept': 'image/*',
              'aria-label': 'Upload your profile picture'
            }
          }).then((result)=>{
            console.log(result.value)
            let newRequest = new FormData();
            newRequest.append("id", id)
            newRequest.append("name", "")
            newRequest.append("last_name", "")
            newRequest.append("age", "")
            newRequest.append("description", "")
            newRequest.append("artist_name_or_band_name", "")
            newRequest.append("experience", String(experience))
            newRequest.append("band", String(band))
            newRequest.append("file", result.value)
            newRequest.append("instruments", "")
            newRequest.append("genres", "")
            const token = JSON.parse(localStorage.getItem("jwt-token"));
            const response = fetch(config.hostname + "/api/user", {
                method: "PUT",
                headers: {
                    "mode": 'no-cors',
                    "Authorization": "Bearer " + token.token
                },
                body: newRequest
    
            }).then((response)=>{
                window.location.href='/personalbio:'+ id
            }) }).then((response)=>{
                console.log(response)
            })
                
          } 

          const getSelectedGenres=(seleccionados, tipo)=>{
            if (tipo === "G"){
                
                setGenreSelected(seleccionados)
            }else if(tipo ==="I"){
                setInstrumentSelected(seleccionados)
            }
          }
          const formatGenresToCallApi=(genres)=>{            
            let aux = ""
            genres.forEach((genre)=>{
                aux = aux + String(genre.value)+","               
            })
            
            return aux
          }
        const redirect=()=>{
            window.location.href="/ChangePasswordNoModal:" + user_id
        }
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2 d-flex justify-content-center">
                    <div className="col-3 d-flex align-items-center flex-column">
                        <img className="rounded-circle mt-5 mb-2" width="300px" height="300px" src={usuarios.avatar}></img>
                        <div className="">
                            <button type="button" className="btn btn-info mb-2"  onClick={changePic}>Cambiar foto de perfil</button>
                        </div>
                        <div className="">
                        <ChangePassword />
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="row mb-2">
                                <h1 className="bioperfil col" onChange={event => setArtist_name_or_band_name(event.target.value)}><strong style={{ textTransform: 'uppercase' }}>{usuarios.artist_name_or_band_name}</strong></h1>
                                <> {edit ? <input className="col mt-1" placeholder={usuarios.artist_name_or_band_name} onChange={event => setArtist_name_or_band_name(event.target.value)} /> : <div></div>}
                            </>
                            </div>
                            <div className="row mb-2 ">
                                <span className="PersonalDates col-11 pt-2"><h3><strong>Datos Personales</strong></h3></span>
                                <button type="button" className="btn btn-info btn-sm col-1" onClick={() => handleChange("edit")}>{!edit ? <FontAwesomeIcon icon={faPencil}/> :< FontAwesomeIcon icon={faXmark}/> }</button>  
                            </div>
                            <div className="row mb-1">
                                <span className="col"><strong>Nombre:</strong> {usuarios.name}</span>
                                <> {edit ? <input placeholder={usuarios.name} id="userName" className="col" onChange={event => setName(event.target.value)} /> : " "}
                                </>
                            </div>

                            <div className="row mb-1">
                                <span className="col"><strong>Apellido:</strong> {usuarios.last_name}</span>
                                <> {edit ? <input placeholder={usuarios.last_name} id="LastName" className="col" onChange={event => setLastName(event.target.value)} /> : " "}
                                </>
                            </div>
                            <div className="row mb-1">
                                <span className="col"><strong>Edad:</strong> {usuarios.age}</span>
                                <> {edit ? <input placeholder={usuarios.age} id="age" className="col" onChange={event => setAge(event.target.value)} /> : " "}
                                </>
                            </div>
                            <div className="row mb-1">
                                <div className="col" id="email"><strong>email:</strong> {usuarios.email}</div>
                                <div className="form-group">
                                    <label>
                                        ¿Eres una banda?
                                        <> {edit ? <input
                                            type="checkbox"
                                            checked={band}
                                            onChange={() => handleChange("band")}
                                        /> : <input
                                            type="checkbox"
                                            checked={usuarios.band}
                                            onChange={() => handleChange("band")} />}</>
                                    </label>
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="form-group">
                                    <label>
                                        ¿Tienes Experiencia?
                                        <>{edit ? <input
                                            type="checkbox"
                                            checked={experience}
                                            onChange={() => handleChange("experience")}
                                        />
                                            : <input
                                                type="checkbox"
                                                checked={usuarios.experience}
                                                onChange={() => handleChange("experience")}
                                            />}</>
                                    </label>
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col">
                                    <label ><strong>Descripción:</strong> {usuarios.description} </label>
                                </div>
                                <> {edit ? <textarea placeholder={usuarios.description} maxLength="1500px" rows="5" id="description" className="mb-3 col" onChange={event => setDescription(event.target.value)} /> : " "}
                                </>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="mb-2" ><strong>Generos:</strong> {userGenre?.map((genre) => genre.label + " ")}</label>
                                    <> {edit ? <AddMusicalGenre selectionEvent={getSelectedGenres} userGenre={userGenre} /> : " "}
                                    </>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="mb-2 "><strong>Instrumentos:</strong> {userInstruments?.map((instruments) => instruments.label + " ")} </label>
                                    <> {edit ? <AddMusicalInstruments selectionEvent={getSelectedGenres} userInstruments={userInstruments} /> : " "}
                                    </>
                                </div>
                            </div>
                        </div>
                    <div className="d-flex justify-content-center mt-3 mb-2" >
                        <> {edit ? <button className="btn btn-info btn-sm" onClick={() => guardar_cambios()}>Guardar Cambios</button> : " "}
                        </>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}