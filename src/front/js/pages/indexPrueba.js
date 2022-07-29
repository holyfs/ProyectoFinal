import React from "react";
import "../../styles/home.css";
import CardPrueba from "./carPrueba";
import { useContext } from "react";
import { Context } from "../store/appContext";
export const IndexPrueba = () => {
	const { store, actions } = useContext(Context);
	return (
		<div>
			<h1 className="titulos text-black ml-4">Usuarios</h1>
			<div className="mt-4 scrolling-wrapper-flexbox">
				{store.users.map((item, index) => {
					return (
						<div key={index}>
							<CardPrueba name={item.name} uid={item.uid} index={index} avatar={item.avatar} artist_name_or_band_name={item.artist_name_or_band_name} />
						</div>
					);
				})}
			</div>
		</div>

	);
};