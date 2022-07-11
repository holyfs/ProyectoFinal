import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Bio } from "./bio";

export const Home = () => {
	const { store, actions } = useContext(Context);

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
