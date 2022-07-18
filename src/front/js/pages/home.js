
import React, { useContext, useState, useEffect, Component } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import "../../styles/index.css";
import Search from "../component/searchComponent"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import Card from "../component/Card";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pagination from "../component/Pagination";
import Filter from "../component/Filter/filter";

export const Home = () => {
    let [pageNumber, updatePageNumber] = useState(1);
    let [gender, updateGender] = useState("");
    let [search, setSearch] = useState("");
    let [fetchedData, updateFetchedData] = useState([]);
    let { info, results } = fetchedData;
    const { store, actions } = useContext(Context);
    let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&gender=${gender}`;


    useEffect(() => {
        (async function () {
          let data = await fetch(api).then((res) => res.json());
          updateFetchedData(data);
        })();
      }, [api]);

      return (

    <div className="App">
  <h1 className="text-center mb-3">Músicos/Banda</h1>
  <Search setSearch={setSearch} updatePageNumber={updatePageNumber} />
  <div className="container">
  <div className="row">

  <Filter
  pageNumber={pageNumber}
  updateGender={updateGender}
  updatePageNumber={updatePageNumber}
    />

    <div className="col-lg-8 col-12">
      <div className="row">
    <Card results={results} />


      </div>
    </div>
  </div>
  </div>
  <Pagination
        info={info}
        pageNumber={pageNumber}
        updatePageNumber={updatePageNumber}
      />
</div>
	);
};
