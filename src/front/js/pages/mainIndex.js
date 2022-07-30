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
    //let [pageNumber, updatePageNumber] = useState(1);
    //let [gender, updateGender] = useState("");
    let [search, setSearch] = useState("");
    let [fetchedData, updateFetchedData] = useState([]);
    let { info, results } = fetchedData;
    const { store, actions } = useContext(Context);

  return (

    <div className="App">
      <h1 className="text-center mb-3">Músicos/Banda</h1>

      <div className="container">
        <div className="row">
          <div className="col">
            <h4>***Filter boceto***</h4>
          </div>  
        </div>
      </div>
      <div className="col-lg-8 col-12">
        <div className="row">
          <Search />
        </div>
      </div>
  </div>
  );
};
