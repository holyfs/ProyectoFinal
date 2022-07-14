import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Card.module.css";




const Card = ({ results }) => {
  let display;

  if (results){
      display = results.map((x) =>{
        let { id, name, image, location } = x;

        return  (
        <div key={id} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark">
          <div className={`${styles.card} d-flex flex-column justify-content-center`}>
          <img className={`${styles.img} img-fluid`} src={image} alt="" />
            <div className={`${styles.content}`}>
              <div className="fs-4 fw-bold mb-4">{name}</div>
              <div className="">
                <div className="fs-6 fw-bold">Last location</div>
                <div className="fs-5">{location.name}</div>
              </div>
            </div>
          </div>
        </div>
        );
      });
  } else {
    display = "No artist founds :(";
  }

  return <>{display}</>;
};

export default Card;