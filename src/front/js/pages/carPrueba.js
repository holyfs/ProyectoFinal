import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import styles from "../../styles/Card.module.css";

const CardPrueba = props => {
	

    return (
        <div>
          <div
            key={props.index}
            className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark"
          >
            <div
              className={`${styles.card} d-flex flex-column justify-content-center`}
            >
              <img
                className={`${styles.img} img-fluid`}
                src={props.avatar}
                alt=""
              />
              <div className={`${styles.content}`}>
                <div className="fs-4 fw-bold mb-4">{props.name}</div>
                <div className="">
                  <div className="fs-6 fw-bold">Nombre Artístico</div>
                  <div className="fs-5">
                    {props.artist_name_or_band_name}
                  </div>
                  <div>
                    <Link to={"/biofinal/" + props.index}>
                      <button type="button" className="btn btn-info">
                        Info
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div> 
	);
};

export default CardPrueba;

CardPrueba.propTypes = {
    artist_name_or_band_name: PropTypes.string,
    avatar: PropTypes.string,
	name: PropTypes.string,
	uid: PropTypes.string,
	index: PropTypes.number
};