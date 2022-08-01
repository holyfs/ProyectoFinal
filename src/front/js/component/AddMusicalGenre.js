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
      }).catch(error => {
        console.log(error);
      })
  }


  useEffect(() => {
    peticionGet();
    setSelected(props.userGenre)
    props.selectionEvent(props.userGenre, "G")

  }, [])
  const handleEvent= (event)=>{
    
    setSelected(event)
    props.selectionEvent(event, "G")
  }


  return (
    <div>
{/*       <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={genres}
        value={selected}
        onChange={(e)=>handleEvent(e)}
        labelledBy="Select"
      />
    </div>
  );
};

export default AddMusicalGenre;