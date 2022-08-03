import "../../styles/barraBusqueda.test.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from "../../styles/Card.module.css";
import "../../styles/botones.css";
import { Link } from "react-router-dom";
import config from "../config";
import AddMusicalGenre from "../component/AddMusicalGenre.js"
import AddMusicalInstruments from "../component/AddMusicalInstruments.js"
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
  const filtroGenre = () => {
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
      <div className="row mb-3">
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
      <div className="row" >
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
                style={{ height: '280px', width: '330px' }}
              />
              <div className={`${styles.content}`}>
                <div className="fs-4  mb-4">{usuarios.user.name}</div>
                <div className="fs-4 fw-bold mb-4">{usuarios.user.artist_name_or_band_name}</div>
                <div className="">
                  <div className="fs-6 fw-bold">Genero Musical</div>
                  <div className="fs-5">
                    {usuarios.genres?.map((genre) => genre.genre.name + " ")}
                  </div>
                  <div className="fs-6 fw-bold">Instrumento</div>
                  <div className="fs-5">
                    {usuarios.instruments?.map((instruments) => instruments.instrument.name + " ")}
                  </div>
                  <div>
                    <Link to={`/bio:${usuarios.user.id}`}>
                      <button type="button" className="botonAnillos">
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
