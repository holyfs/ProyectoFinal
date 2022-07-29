import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import '../../styles/bio.css';
import { Button } from "reactstrap";

import { Context } from "../store/appContext";

export const Images = () => {

    
    return (
    <>

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
        <form>
            <a href="/PersonalBio">
                <input type="button" value="Volver" />
            </a>
        </form>
    </>   
    
)
}