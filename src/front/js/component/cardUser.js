import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Card.module.css";




const CardUser = ({ results }) => {
  let display;

  if (results){
      display = results.map((x) =>{
        let { id, name, artist_name_or_band_name, avatar} = x;

        return  (

        <div key={id} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark">
          <div className={`${styles.card} d-flex flex-column justify-content-center`}>
          <img className={`${styles.img} img-fluid`} src={avatar} alt="" />
            <div className={`${styles.content}`}>
              <div className="fs-4 fw-bold mb-4">{name}</div>
              <div className="">
                <div className="fs-6 fw-bold">Nombre de Usuario</div>
                <div className="fs-5">{artist_name_or_band_name}</div>
                <div><Link to="/bio"><button type="button" class="btn btn-info">Info</button></Link></div>
              </div>
            </div>
          </div>
        </div>
      
        );
      });
  } else {
    display = "No artist founds peinate con la raya al centro :(";
  }

  return <>{display}</>;
};

export default CardUser;