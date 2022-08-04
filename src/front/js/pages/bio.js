import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Contact from "../component/contact";
import '../../styles/bio.css';
import { ContactNoModal } from "../component/contact.nomodal";
import axios from "axios";
import config from "../config.js"
import "../../styles/tittles.css";

import { Context } from "../store/appContext";

export const Bio = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [userInstruments, setUserInstruments] = useState(null);
    const [userGenre, setUserGenres] = useState(null);
    let id = window.location.href.split(":")[2]

    const peticionGet = async () => {
        await axios.get(`${config.hostname}/api/user/${id}`)
            .then(response => {
                setUsuarios((response.data.user));
                setUserInstruments(response.data.instruments);
                setUserGenres(response.data.genres);
                setTablaUsuarios(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    useEffect(() => {
        peticionGet();
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row mt-2 d-flex justify-content-center">
                    <div className="col-3 d-flex align-items-center flex-column">
                        <img className="rounded-circle mt-5 mb-2" width="300px" height="300px" src={usuarios.avatar}></img>
                    </div>
                    <div className="col-7">
                        <div className="row">
                            <div className="row mb-2">
                                <h1 className="bioperfil col" onChange={event => setArtist_name_or_band_name(event.target.value)}><strong style={{ textTransform: 'uppercase' }}>{usuarios.artist_name_or_band_name}</strong></h1>
                            </div>
                            <div className="row mb-2 ">
                                <span className="PersonalDates col-10 pt-2"><h3><strong>Datos Personales</strong></h3></span>
                                <button type="button" className="btn btn-info col-2" onClick={() => { window.location.href = "/contactNoModal:" + id }}><strong>Contacto</strong></button>
                            </div>
                            <div className="row mb-1">
                                <span className="col"><strong>Nombre:</strong> {usuarios.name}</span>
                            </div>
                            <div className="row mb-1">
                                <span className="col"><strong>Apellido:</strong> {usuarios.last_name}</span>
                            </div>
                            <div className="row mb-1">
                                <span className="col"><strong>Edad:</strong> {usuarios.age}</span>
                            </div>
                            <div className="row mb-1">
                                <div className="form-group">
                                    <label>
                                        banda:
                                        <input
                                            type="checkbox"
                                            checked={usuarios.band}/>
                                    </label>
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="form-group">
                                    <label>
                                        Experiencia:
                                        <input
                                            type="checkbox"
                                            checked={usuarios.experience}/>
                                    </label>
                                </div>
                            </div>
                            <div className="row mb-1">
                                <div className="col">
                                    <label><strong>Descripción</strong> </label>
                                    <div>{usuarios.description} </div>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="mb-2" ><strong>Generos:</strong> {userGenre?.map((genre) => genre.label + " ")}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label className="mb-2 "><strong>Instrumentos:</strong> {userInstruments?.map((instruments) => instruments.label + " ")} </label>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3 mb-2" >

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}