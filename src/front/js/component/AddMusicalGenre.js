import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";



const AddMusicalGenre = (props) => {
    const [selected, setSelected] = useState([]);
    const [genres, setGenres]= useState([]);
    const [tablaGenres, setTablaGenres]= useState([]);
/*      if (props.userGenre.length > 0){
      //setSelected(props.userGenre)
      console.log(props.userGenre)
    }  
  const userAux=props.userGenre */

    const peticionGet=async()=>{
        await axios.get("https://3001-holyfs-proyectofinal-nmoo6rhjs9l.ws-eu54.gitpod.io/api/genre")
        .then(response=>{
          setGenres(response.data);
          setTablaGenres(response.data);
        }).catch(error=>{
          console.log(error);
        })
      } 
      
    useEffect(()=>{
        peticionGet();
        },[])

  return (
    <div>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect   
        options={genres}                                   
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default AddMusicalGenre;