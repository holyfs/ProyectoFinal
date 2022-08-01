import React from "react";
import "../../styles/home.css";
import CardPrueba from "./carPrueba";
import { useContext } from "react";
import { Context } from "../store/appContext";
export const IndexPrueba = () => {
	const { store, actions } =  useContext(Context);

	return (
		<div>
			<h1 className="titulos text-black ml-4">Usuarios</h1>
			<div className="mt-4 scrolling-wrapper-flexbox">
				{store.users?store.users.map((item, index) => {
					return (
						<div key={index}>
							<CardPrueba name={item.user.name} uid={item.user.id} index={index} avatar={item.user.avatar} artist_name_or_band_name={item.user.artist_name_or_band_name} />
						</div>
					);
				}): "Cargando..." }
			</div>
		</div>

	);
};