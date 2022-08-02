import React, { useEffect, useState } from "react";
import { MultiSelect, Dropdown } from "react-multi-select-component";
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
      }).catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    peticionGet();
    if (props.userGenre.length > 0){
    setSelected(props.userGenre)
    props.selectionEvent(props.userGenre, "G")
  }else{
    setSelected([])
    props.selectionEvent([], "G")
  }

  }, [])
  const handleEvent= (event)=>{    
    setSelected(event)
    props.selectionEvent(event, "G")
  }


  return (
    <div>
      
      <MultiSelect
        options={genres}
        value={selected}
        onChange={(e)=>handleEvent(e)}
      />
    </div>
  );
};

export default AddMusicalGenre;