import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Contact from "../component/contact.nomodal";
import '../../styles/bio.css';
import { Context } from "../store/appContext";
import ChangePassword from "../component/ChangePassword";
import { ChangePasswordNoModal } from "../component/ChangePassword.nomodal";
import { Images } from "./galeriaImagenes";
import { useNavigate } from 'react-router-dom';
import AddMusicalGenre from "../component/AddMusicalGenre.js";
import AddMusicalInstruments from "../component/AddMusicalInstruments.js";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import Swal from "sweetalert2"
import axios from "axios";
import config from "../config.js";
import { faWindowMinimize } from "@fortawesome/free-regular-svg-icons";


export const PersonalBio = () => {
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
                console.log(response.data.user)
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
        newRequest.append("instruments", "")
        newRequest.append("genres", "")
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
        }
         else {
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
/*                 window.location.href='/personalbio:'+ id */
            }).then((response)=>{
                console.log(response)
            })
            
          })      
          } 
      
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2">
                    <div className="col-6 offset-3">
                        <h1 className="bioperfil" onChange={event => setArtist_name_or_band_name(event.target.value)}>{usuarios.artist_name_or_band_name}</h1>
                        <div> {edit ? <input onChange={event => setArtist_name_or_band_name(event.target.value)}/>: <div></div>}
                        </div>
                    </div>
                    {/* <div className="d-flex justify-content-end">
                        <form>
                            <a href="/images">
                                <input type="button" value="Galería de Imágenes" />
                            </a>
                        </form>
                    </div> */}
                </div>


                <div className="row">
                    <div className="col-3 d-flex justify-content-center" >
                        <img className="rounded-circle" width="350px" height="350px" src={usuarios.avatar}></img>
                    </div>
                    <div className="col-5">
                        <h3 className="PersonalDates">Datos Personales</h3>
                        <button type="button" className="btn btn-info" onClick={()=>handleChange("edit")}>edit</button>
                        <div className="row">
                            <span className="col-4"><strong>Nombre:</strong> {usuarios.name}</span>
                            <> {edit ? <input id="userName" className="col-8" onChange={event => setName(event.target.value)}/>: " "}
                            </>
                        </div>
                        <div className="row">
                            <span className="col-4"><strong>Apellido:</strong> {usuarios.last_name}</span>
                            <> {edit ? <input id="LastName" className="col-8" onChange={event => setLastName(event.target.value)}/>: " "}
                            </>
                        </div>
                        <div className="row">
                            <span className="col-4"><strong>Edad:</strong> {usuarios.age}</span>
                            <> {edit ? <input id="age" className="col-8" onChange={event => setAge(event.target.value)}/>: " "}
                            </>
                        </div>
                        <div className="col-4" id="email"><strong>email:</strong> {usuarios.email}</div>
{/*                         <ChangePassword /> */}
                        <div className="form-group">
                            <label>
                                ¿Eres una banda?
                                <> {edit ?<input
                                    type="checkbox"
                                    checked={band}
                                    onChange={() => handleChange("band")}
                                />:<input
                                type="checkbox"
                                checked={usuarios.band}
                                onChange={() => handleChange("band")}/>}</>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>
                                ¿Tienes Experiencia?
                                <>{edit ? <input
                                    type="checkbox"
                                    checked={experience}
                                    onChange={() => handleChange("experience")}
                                />
                                :<input
                                type="checkbox"
                                checked={usuarios.experience}
                                onChange={() => handleChange("experience")}
                            />}</>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2 offset-1">
                        <button type="button" className="btn btn-info" onClick={changePic}>Cambiar foto de perfil</button>
                    </div>
                    <div className="col-5">
                        <div className="row">
                        <label ><strong>Descripción:</strong> </label>
                        <div className="mb-3" id="description">{usuarios.description} </div>
                        <> {edit ? <textarea  maxLength="1500px" rows="5" id="description" className="mb-3" onChange={event => setDescription(event.target.value)}/>: " "}
                        </>
                        </div>                   
                        <label className="mb-2" ><strong>Generos:</strong> {userGenre?.map((genre) => genre.label + " ")}</label>
                        <> {edit ? <AddMusicalGenre userGenre={userGenre} />: " "}
                            </>
                        <label className="mb-2" ><strong>Instrumentos:</strong> {userInstruments?.map((instruments) => instruments.label + " ")} </label>
                        <> {edit ? <AddMusicalInstruments userInstruments={userInstruments} />: " "}
                            </>
                        <div className="d-flex justify-content-center mt-3 mb-2" >
                            <button onClick={() => guardar_cambios()}>Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}