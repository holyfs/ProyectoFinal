import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Contact from "../component/contact";
import '../../styles/bio.css';
import { ContactNoModal } from "../component/contact.nomodal";
import axios from "axios";

import { Context } from "../store/appContext";

export const Bio = () => {
    const [usuarios, setUsuarios]= useState([]);
    const [tablaUsuarios, setTablaUsuarios]= useState([]);
    const [userInstruments, setUserInstruments] = useState(null);
    const [userGenre, setUserGenres] = useState(null);
    let id = window.location.href.split(":")[2]

    const peticionGet=async()=>{
        await axios.get(`https://3001-holyfs-proyectofinal-q4aicqzoqf2.ws-eu54.gitpod.io/api/user/${id}`)
        .then(response=>{
          setUsuarios((response.data.user));
          console.log(response);
          setUserInstruments(response.data.instruments);
          setUserGenres(response.data.genres);
          setTablaUsuarios(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }
      useEffect(()=>{
        peticionGet();
        },[])
    return (
    <>
    <div>
    <div
    key={usuarios.id} 
    className="container-fluid">
       
       
            <div className="row">
                <div className="col-3">
                    <h1 className="bioperfil"> {usuarios.artist_name_or_band_name}</h1>
                </div>
                
                    
                <div className="d-flex justify-content-end">
                        <form>
                            <a href={"/contactNoModal:"+id}>
                                <input type="button" value="Contacto" />
                            </a>
                        </form>
                </div>
              
				
                
            </div>
           
        
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <img className="rounded-circle" width="350px" height="350px" src={usuarios.avatar}></img>
                </div>
                <div className="col-3">
                <h1 className="PersonalDates">Datos Personales</h1>
                    <ul className="list-group">
                    <label><h3>Nombre</h3></label>
                    <li class="list-group-item list-group-item-success">{usuarios.name}</li>
                    <label><h3>Apellido</h3></label>
                    <li class="list-group-item list-group-item-success">{usuarios.last_name}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                <div className="row">
                <label className="mb-2" ><strong>Generos:</strong> {userGenre?.map((genre) => genre.label + " ")}</label>
                </div>
                <div className="row">
                <label className="mb-2" ><strong>Instrumentos:</strong> {userInstruments?.map((instruments) => instruments.label + " ")} </label>
                </div>
                </div>
            </div>
           
        </div>
            <div className="form-floating" style={{alignItems: "center"}}>
                <textarea className="form-control" style={{ display: "flex", border: "3px solid black", height: "240px",
		        padding: "10px", textAlign: "center", fontSize: 20, alignItems:"center", color: "white", background: "black",
		        width: "290px" }} id="floatingTextarea2">{usuarios.description}</textarea>
            </div>
    </div>
           
    </div>
    </>
        
       

    
)
}