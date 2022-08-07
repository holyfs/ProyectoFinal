import "../../styles/SearchCardResults.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../styles/Card.module.css";
import "../../styles/botones.css";
import { Link } from "react-router-dom";
import config from "../config";
import AddMusicalGenre from "./AddMusicalGenre.js"
import AddMusicalInstruments from "./AddMusicalInstruments.js"
function Search() {
  const [usuarios, setUsuarios] = useState([]);
  const [tablaUsuarios, setTablaUsuarios] = useState([]);
  const [userInstruments, setUserInstruments] = useState([]);
  const [searchUserIntruments, setSearchUserInstruments] = useState([]);
  const [searchUserGenre, setSearchUserGenre] = useState([]);
  /*   const [busqueda, setBusqueda]= useState(""); */

  const peticionGet = async () => {
    await axios.get(`${config.hostname}/api/user`)
      .then(response => {
        setUsuarios(response.data.response);
        setTablaUsuarios(response.data.response);
        setUserInstruments(response.data.response.instruments);

        //setUserGenres(response.data.genres); 

        //console.log(response.data.respone.instruments);
      }).catch(error => {
        console.log(error);
      })

  }

  const handleChange = e => {
    /*     setBusqueda(e.target.value); */
    filtrar(e.target.value);
  }


  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (elemento.user.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        || elemento.user.artist_name_or_band_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        //|| elemento.user.genres.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
        //|| elemento.user.instruments.instrument.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())

      ) {
        return elemento;
      }
    });
    setUsuarios(resultadosBusqueda);
    //setUserInstruments(resultadosBusqueda);
    //setUserGenres(resultadosBusqueda);
  }



  const getSelectedGenres = (selection, tipo) => {
    if (tipo === "G") {
      setSearchUserGenre(selection)
    } else if (tipo === "I") {
      setSearchUserInstruments(selection)
    }
  }
  const NoEncontroNada = () => {
    let mensaje = <div className="alert alert-danger mt-3" role="alert">
      No hay resultados para tu búsqueda!
    </div>
    return mensaje
  }

  const filtroGenre = () => {

    if (searchUserGenre.length === 0) {
      setUsuarios(tablaUsuarios)
      return
    }

    let filtroPorGenero = []
    tablaUsuarios.forEach((elemento) => {
      elemento.genres.forEach((genres) => {
        searchUserGenre.forEach((value) => {
          if (genres.genre.id === value.value && !filtroPorGenero.find((elemento) => elemento.user.id === genres.user_id)) {
            filtroPorGenero.push(elemento)
          }
        })
      })
    })
    setUsuarios(filtroPorGenero)
  }


  const filtroInstruments = () => {
    if (searchUserIntruments.length === 0) {
      setUsuarios(tablaUsuarios)
      return;
    }

    let filtroPorInstrumento = []
    tablaUsuarios.forEach((elemento) => {
      elemento.instruments.forEach((instruments) => {
        searchUserIntruments.forEach((value) => {
          if (instruments.instrument.id === value.value && !filtroPorInstrumento.find((elemento) => elemento.user.id === instruments.user_id)) {
            filtroPorInstrumento.push(elemento)
          }
        })
      })
    })
    setUsuarios(filtroPorInstrumento)
  }

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <>
      <div className="row" >
        <div className="d-flex justify-content-start">Nombre de artista o banda:
          <div style={{ width: '100%' }}>
            <input
              className="form-control"
              /*             value={busqueda} */
              /*             placeholder="Búsqueda por Nombre de Artista o Banda" */
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn btn-info">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-start">Generos musicales:
            <div style={{ width: '95%' }} >
              <AddMusicalGenre selectionEvent={getSelectedGenres} userGenre={[]} />
            </div>
            <div >
              <button className="btn btn-info" id="buton_busqueda_genre" onClick={filtroGenre}>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex justify-content-end">Instrumentos musicales:
            <div style={{ width: '95%' }}>
              <AddMusicalInstruments selectionEvent={getSelectedGenres} userInstruments={[]} />
            </div>
            <div>
              <button className="btn btn-info" id="buton_busqueda_intrum" onClick={filtroInstruments}>  {/* style={{ height: '10%' }} */}
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-around mt-3" >
        {usuarios.length > 0 ? usuarios.map((usuarios) => (
          <div
            key={usuarios.user.id}
            className="col-lg-4 col-md-6 mb-4"
          >
            <div className="card image6" style={{ "width": 18 + "rem", "height": 30 + "rem" , "background": "rgba(0, 185, 182, 0.3)", "borderRadius": 10 + "px" }}>
              <img src={usuarios.user.avatar} className="card-img-top " alt="imagen de la banda" style={{ height: 15 + "rem", width: 18 + "rem", "borderRadius": 10 + "px " +10 + "px " + 0 + "px " + 0 + "px " }} />
              <div className="card-body">
                <h5 className="card-title">{usuarios.user.artist_name_or_band_name}</h5>
                <p className="card-text"><strong>Género Musical: </strong>
                  {usuarios.genres?.map((genre) => genre.genre.name + " ")}</p>
                <p className="card-text"><strong>Instrumento: </strong>
                  {usuarios.instruments?.map((instruments) => instruments.instrument.name + " ")}</p>
              </div>
              <div className="card-body">
                <a href={`/bio:${usuarios.user.id}`} className="btn btn-info image3">BIO</a>
              </div>
            </div>
          </div>
        )) : <div>{NoEncontroNada()}</div>
        }
      </div>
    </>
  );
}


export default Search;

