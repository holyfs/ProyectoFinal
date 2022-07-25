import React, { useContext, useState, useEffect, Component } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css";
import Search from "../component/searchComponent"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import CardUser from "../component/cardUser";
import ShowUser from "../component/showUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pagination from "../component/Pagination";
import Filter from "../component/Filter/filter";

export const MainIndex = () => {
    //let [pageNumber, updatePageNumber] = useState(1);
    //let [gender, updateGender] = useState("");
    //let [search, setSearch] = useState("");
    let [fetchedData, updateFetchedData] = useState([]);
    let { info, results } = fetchedData;
    const { store, actions } = useContext(Context);
    let api = `https://3001-holyfs-proyectofinal-q4aicqzoqf2.ws-eu54.gitpod.io/api/user`;


    useEffect(() => {
        (async function () {
          let data = await fetch(api).then((res) => res.json());
          console.log(data);
          updateFetchedData(data);
        })();
      }, [api]);

      return (

    <div className="App">
  <h1 className="text-center mb-3">Músicos/Banda</h1>
  <h4>***Barra de Busqueda***</h4>
  <div className="container">
  <div className="row">

  <h4>***Filter boceto***</h4>
    <ShowUser />
    <div className="col-lg-8 col-12">
      <div className="row">
    <CardUser results={results} />


      </div>
    </div>
  </div>
  </div>
 <h4>***Footer Pagination***</h4>
</div>
	);
};
