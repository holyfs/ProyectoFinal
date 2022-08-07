import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import config from "../config";


const AddMusicalGenre = (props) => {
  const [selected, setSelected] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tablaGenres, setTablaGenres] = useState([]);

  const peticionGet = async () => {
    await axios.get(`${config.hostname}/api/genre`)
      .then(response => {
        setGenres(response.data);
        setTablaGenres(response.data);
        let selectorPlaceHolder= document.getElementsByClassName("rmsc")[0]
        selectorPlaceHolder.querySelector(".gray").innerHTML="Géneros musicales"
      }).catch(error => {
        console.log(error);
      })
  }
/* let placeholder= select.querySelector(".gray")="Generos" */
/* let select = document.getElementsByClassName("rnsc")[0]
select.children[0].children[0].children[0].children[0].innerHTML = "y ahora?" */


  useEffect(() => {
    peticionGet();
    if (props.userGenre.length > 0) {
      setSelected(props.userGenre)
      props.selectionEvent(props.userGenre, "G")
    } else {
      setSelected([])
      props.selectionEvent([], "G")
    }

  }, [])
  const handleEvent = (array) => {
    setSelected(array)
    props.selectionEvent(array, "G")
  }


  return (
    <div>

      <MultiSelect
        options={genres}
        value={selected}
        onChange={(array) => handleEvent(array)}
                
      />
    </div>
  );
};

export default AddMusicalGenre;