import React, { useContext, useState, useEffect, Component } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Bio } from "./bio";

export const Home = () => {
	let [pageNumber, updatePageNumber] = useState(1);
	let [search, setSearch] = useState("");
	let [fetchedData, updateFetchedData] = useState([]);
	let { info, results } = fetchedData;
	const { store, actions } = useContext(Context);
	let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}`;
	
	
	useEffect(() => {
		(async function () {
		  let data = await fetch(api).then((res) => res.json());
		  updateFetchedData(data);
		})();
	  }, [api]);
	
	  return (
		
	<div className="App">
  <h1 className="text-center mb-3">Músicos/Banda</h1>
  <Searchfilter setSearch={setSearch} updatePageNumber={updatePageNumber} />º
  <div className="container">
  <div className="row">
   
		Filter component will be placed here
	
    <div className="col-lg-8 col-12">
      <div className="row">
	<Card results={results} />
		
       
      </div>
    </div>
  </div>
  </div>
</div>

	
				
	);
};
