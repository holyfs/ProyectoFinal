import React, { useContext, useState, useEffect, Component } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Bio } from "./bio";

export const Home = () => {
	let [pageNumber, setPageNumber] = useState(1);
	let [search, setSearch] = useState("");
	let [fetchedData, updateFetchedData] = useState([]);
	let { info, results } = fetchedData;
	const { store, actions } = useContext(Context);
	let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}`
	
	
	useEffect(() => {
		(async function () {
		  let data = await fetch(api).then((res) => res.json());
		  updateFetchedData(data);
		})();
	  }, [api]);
	
	  return (
		
	<div className="App">
  <h1 className="text-center mb-3">Músicos/Banda</h1>
  <Searchfilter setSearch={setSearch} updatePageNumber={updatePageNumber} />
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

	return (
		<div class="container-lg">
			<div class="row row-cols-1 row-cols-md-4 g-4">
				<div class="col">
					<div class="card">
						<img
							src="http://photos.demandstudios.com/getty/article/174/175/dv1788026.jpg"
							class="card-img-top"
							alt="..."
						/>
						<div class="card-body">
							<h5 class="card-title">Los Gofiones</h5>
							<p class="card-text">
							Una agrupación, conjunto, ensamble, banda o grupo musical se refiere a dos o más personas que, a través de la voz o de instrumentos musicales, ...
							</p>
							<a href="/bio" className="btn btn-primary">
							Ver Perfil
							</a>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card">
						<img
							src="http://photos.demandstudios.com/getty/article/174/175/dv1788026.jpg"
							class="card-img-top"
							alt="..."
						/>
						<div class="card-body">
							<h5 class="card-title">Los Chunguitos</h5>
							<p class="card-text">
							Una agrupación, conjunto, ensamble, banda o grupo musical se refiere a dos o más personas que, a través de la voz o de instrumentos musicales, ...
							</p>
							<a href="/bio" className="btn btn-primary">
							Ver Perfil
							</a>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card">
						<img
							src="http://photos.demandstudios.com/getty/article/174/175/dv1788026.jpg"
							class="card-img-top"
							alt="..."
						/>
						<div class="card-body">
							<h5 class="card-title">Frank el largo</h5>
							<p class="card-text">
							Una agrupación, conjunto, ensamble, banda o grupo musical se refiere a dos o más personas que, a través de la voz o de instrumentos musicales, ...
							</p>
							<a href="/bio" className="btn btn-primary">
							Ver Perfil
							</a>
						</div>
					</div>
				</div>
				<div class="col">
					<div class="card">
						<img
							src="http://photos.demandstudios.com/getty/article/174/175/dv1788026.jpg"
							class="card-img-top"
							alt="..."
						/>
						<div class="card-body">
							<h5 class="card-title">Ukelele Mix</h5>
							<p class="card-text">
							Una agrupación, conjunto, ensamble, banda o grupo musical se refiere a dos o más personas que, a través de la voz o de instrumentos musicales, ...
							</p>
							<a href="/bio" className="btn btn-primary">
								Ver Perfil
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
