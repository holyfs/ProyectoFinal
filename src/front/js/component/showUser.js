import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../../styles/Card.module.css";


const ShowUser = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    // axios.get(`/users`).then(res => {
    //   const users = res.data;
    //   setUsers(users);
    // });

    axios
      .all([axios.get(`https://3001-holyfs-proyectofinal-5m505b4tkc5.ws-eu54.gitpod.io/api/user`)])
      .then(
        axios.spread((users) => {
          const user = users.data;
          setUser(user);

        })
      );
  }, []);

  return (
    <>
      {user.map(users => (
        <div key={users.id} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4 position-relative text-dark">
          <div className={`${styles.card} d-flex flex-column justify-content-center`}>
            <img className={`${styles.img} img-fluid`} src={users.avatar} alt="" />
            <div className={`${styles.content}`}>
              <div className="fs-4 fw-bold mb-4">{users.name}</div>
              <div className="">
                <div className="fs-6 fw-bold">Nombre Artístico</div>
                <div className="fs-5">{users.artist_name_or_band_name}</div>
                <div><Link to="/bio"><button type="button" class="btn btn-info">Info</button></Link></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowUser;