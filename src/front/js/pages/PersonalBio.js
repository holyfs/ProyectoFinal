import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Contact from "../component/contact";
import '../../styles/bio.css';

import { Context } from "../store/appContext";

export const PersonalBio = () => {

    
    return (
    <>
        <div className="container-fluid"> 
            <div className="row">
                <div className="col-3">
                    <h1 className="bioperfil">Nombre de Banda</h1>
                </div>
                <div className="d-flex justify-content-end">
                    <Link to="#">
						<button className="btn btn-primary">Galeria de Imagenes</button>
				    </Link>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <img className="rounded-circle" width="250px" height="250px" src="https://www.rockaxis.com/img/newsList/4503504.png"></img>
                </div>
                <div className="col-3">
                    <h3 className="PersonalDates">Datos Personales</h3>
                    <input className="userName" />
                    <input className="nickName" />
                </div>
            </div>
            <button>Cambiar Foto de Perfil</button>
        </div>

        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <input className="genre" />
                    <input className="instruments" />
                </div>
                <div className="col-1">
                    
                </div>
                <div className="col-6">
                    <input className="description" />
                </div>
            </div>
           
        </div>

        <button>Guardar Cambios</button>    
        
    </>   
    
)
}