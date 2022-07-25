import React, { useContext, useState, useEffect, Component } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css";
import Search from "../component/barraBusqueda.test"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import ShowUser from "../component/showUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pagination from "../component/Pagination";
import Filter from "../component/Filter/filter";

export const MainIndex = () => {
<<<<<<< HEAD
    //let [pageNumber, updatePageNumber] = useState(1);
    //let [gender, updateGender] = useState("");
    let [search, setSearch] = useState("");
    let [fetchedData, updateFetchedData] = useState([]);
    let { info, results } = fetchedData;
    const { store, actions } = useContext(Context);
    let api = `https://3001-holyfs-proyectofinal-q4aicqzoqf2.ws-eu54.gitpod.io/api/user/&name=${search}`;
=======
  //let [pageNumber, updatePageNumber] = useState(1);
  //let [gender, updateGender] = useState("");
  //let [search, setSearch] = useState("");
  let [fetchedData, updateFetchedData] = useState([]);
  let { info, results } = fetchedData;
  const { store, actions } = useContext(Context);
  let api = `https://3001-holyfs-proyectofinal-5m505b4tkc5.ws-eu54.gitpod.io/api/user`;
>>>>>>> 3c1383d (se conecta signup back y front, se hace login, verificar personalBio)


  useEffect(() => {
    (async function () {
      let data = await fetch(api).then((res) => res.json());
      console.log(data);
      updateFetchedData(data);
    })();
  }, [api]);

  return (

    <div className="App">
<<<<<<< HEAD
  <h1 className="text-center mb-3">Músicos/Banda</h1>
  
  <div className="container">
  <div className="row">
  <div className="col">
  <h4>***Filter boceto***</h4>
  </div>
  
  
  <div className="col-lg-8 col-12">
  <div className="row">
  <Search />
  </div>
  </div>
  </div> 
  </div>
  
 <h4>***Footer Pagination***</h4>
</div>
	);
=======
      <h1 className="text-center mb-3">Músicos/Banda</h1>
      <h4>***Barra de Busqueda***</h4>
      <h4>***Filter boceto***</h4>
      {/*   <div className="container">
  <div className="row row-cols"> */}
      <div className="container">
        <div className="row">
          <ShowUser />
        </div>
        {/*     <ShowUser className="col"/> */}
        {/*     <div className="container-row">
      <div className="row row-cols-2">
        <div className= "col">
          <CardUser results={results} />
        </div>

      </div>
    </div> */}
        {/*   </div>
  </div> */}
      </div>
      <h4>***Footer Pagination***</h4>
    </div>
  );
>>>>>>> 3c1383d (se conecta signup back y front, se hace login, verificar personalBio)
};
