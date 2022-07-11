import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Contact from "../component/contact";
import '../../styles/bio.css';

import { Context } from "../store/appContext";

export const Bio = () => {

    
    return (
    <>
        <div className="container-fluid"> 
            <div className="row">
                <div className="col-3">
                    <h1 className="bioperfil">Nombre de Banda</h1>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="Contactar" data-bs-toggle="modal" data-bs-target="#exampleModal">Contactar</button>
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
                    <div className="userName">USERNAME</div>
                    <div className="nickName">NICKNAME</div>
                </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <div className="genre">GENEROS</div>
                    <div className="instruments">INSTRUMENTOS</div>
                </div>
                <div className="col-1">
                    
                </div>
                <div className="col-6">
                    <div className="description">Slipknot es una banda estadounidense de metal alternativo formada en 1995 en Des Moines, Iowa, Estados Unidos. Sus integrantes en la actualidad son Corey Taylor, Craig Jones, Jim Root, Mick Thomson, Shawn Crahan y Sid Wilson. Slipknot es conocida por las máscaras características de cada uno de sus miembros, que cambian conforme han sacado más discografía.
                        Sus miembros utilizan dos tipos de guitarra (principal y rítmica), un bajo, dos instrumentos de percusión personalizados, una batería e instrumentos electrónicos como sampler o mesas de mezclas. El sonido de la banda ha sido descrito como "una máquina trilladora devorando un grupo de tambores militares".5​ El vocalista Corey Taylor también incorpora diversos estilos vocales, como por ejemplo la voz gutural, el canto melódico y el rapeo, mientras que las letras en general tienen un tono agresivo. Las influencias de la banda incluyen, entre otros géneros, el death metal, el thrash metal y el heavy metal, aunque suelen ser incluidos con asiduidad dentro del metal alternativo y el nu metal. También fueron incluidos en el movimiento conocido como nueva ola de heavy metal americano.
                        Los inicios de Slipknot se remontan al año 1992. La banda sufrió muchos cambios en su formación antes del lanzamiento de su primera demo Mate.Feed.Kill.Repeat en 1996, en el que el vocalista era Anders Colsefini. En 1999 la banda lanzó su exitoso debut homónimo con Corey Taylor como nuevo vocalista. Desde entonces, han publicado 6 álbumes de estudio: Slipknot (1999), Iowa (2001), Vol. 3: The Subliminal Verses (2004), All Hope Is Gone (2008), que debutó en la posición #1 dentro del Billboard 200, .5: The Gray Chapter (2014) siendo este el segundo álbum de la banda en debutar en el número uno de Billboard 200, vendiendo 132.000 copias en su primera semana, y We Are Not Your Kind (2019). La banda ha lanzado cinco DVD, incluyendo Disasterpieces, del cual se han vendido 3 millones de copias en Estados Unidos. Slipknot ha vendido más de 20 millones de álbumes en todo el mundo.</div>
                </div>
            </div>
        </div>

        
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://es.rollingstone.com/wp-content/uploads/2022/02/Corey-Taylor-dice-que-el-nuevo-album-de-Slipknot-sera-mas-oscuro-que-el-anterior.jpg" className="d-block w-100" alt="..."></img>
                </div>
            <div className="carousel-item">
                    <img src="https://indiehoy.com/wp-content/uploads/2020/09/slipknot.jpg" className="d-block w-100" alt="..."></img>
            </div>
            <div className="carousel-item">
                    <img src="https://www.mondosonoro.com/wp-content/uploads/2015/03/Slipknot.jpg" className="d-block w-100" alt="..."></img>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
        </div>
    </>   
    
)
}