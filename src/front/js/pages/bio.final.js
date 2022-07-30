import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const BioFinal = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
    useEffect(() => {
		actions.getDetalleUser(params.uid);
	}, []);

    return (
		<div className="container d-flex flex-row bg-negro rounded p-3">
			<img src={store.detalle.avatar} alt="..." />
			<div className="d-flex flex-column text-white">
				<h1 className="text-center">{store.users[params.uid].name}</h1>
				
					<ul>
						<li>Nombre: {store.detalle != null ? store.detalle.name : ""}</li>
						<li>Apellido: {store.detalle != null ? store.detalle.last_name : ""}</li>
					</ul>
					
					
				
			</div>
		</div>
	);
};

BioFinal.propTypes = {
	match: PropTypes.object,
	uid: PropTypes.string,
};