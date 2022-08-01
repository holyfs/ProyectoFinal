import "../../styles/barraBusqueda.test.css";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/Card.module.css";
import { Link } from "react-router-dom";
import config from "../config";

function Search() {
  const [usuarios, setUsuarios]= useState([]);
  const [tablaUsuarios, setTablaUsuarios]= useState([]);
  const [userInstruments, setUserInstruments] = useState(null);
  const [userGenre, setUserGenres] = useState(null);
  const [busqueda, setBusqueda]= useState("");

  const peticionGet=async()=>{
    await axios.get(`${config.hostname}/api/user`)
    .then(response=>{
      console.log(response)
      setUsuarios(response.data.response);
      setTablaUsuarios(response.data);
      setUserInstruments(response.data.instruments);
      console.log(response.data);
      setUserGenres(response.data.genres);
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleChange=e=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar=(terminoBusqueda)=>{
    var resultadosBusqueda=tablaUsuarios.filter((elemento)=>{
      if(elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || elemento.artist_name_or_band_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      ){
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
  }

  useEffect(()=>{
    peticionGet();
    },[])

    return (
      <>
        <div className="containerInput">
          <input
            className="form-control inputBuscar"
            value={busqueda}
            placeholder="Búsqueda por Nombre"
            onChange={handleChange}
          />
          <button className="btn btn-success">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="row">
          {usuarios.map((usuarios) => (
            <div
              key={usuarios.user.id}
              className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark"
            >
              <div
                className={`${styles.card} d-flex flex-column justify-content-center`}
              >
                <img
                  className={`${styles.img} img-fluid`}
                  src={usuarios.user.avatar}
                  alt=""
                />
                <div className={`${styles.content}`}>
                  <div className="fs-4 fw-bold mb-4">{usuarios.user.name}</div>
                  <div className="">
                    <div className="fs-6 fw-bold">Nombre Artístico</div>
                    <div className="fs-5">
                      {usuarios.user.artist_name_or_band_name}
                    </div>
                    <div className="fs-6 fw-bold">Genero Musical</div>
                    <div className="fs-5">
                    {usuarios.genres?.map((genre) => genre.genre.name + ", ")}
                    </div>
                    <div className="fs-6 fw-bold">Instrumento</div>
                    <div className="fs-5">
                    {usuarios.instruments?.map((instruments) => instruments.instrument.name + ", ")}
                    </div>
                    <div>
                      
                      <Link to={`/bio:${usuarios.user.id}`}>
                        <button type="button" className="btn btn-info">
                          Info
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> 
      </>
    );
    }
    
    export default Search;