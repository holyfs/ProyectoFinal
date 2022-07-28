import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";



const AddMusicalGenre = () => {
    const peticionGet=async()=>{
        await axios.get("https://3001-holyfs-proyectofinal-nmoo6rhjs9l.ws-eu54.gitpod.io/api/genre")
        .then(response=>{
          setInstruments(response.data);
          setTablaInstruments(response.data);
        }).catch(error=>{
          console.log(error);
        })
      } 
    const [selected, setSelected] = useState([]);
    const [instruments, setInstruments]= useState([]);
    const [tablaInstruments, setTablaInstruments]= useState([]);
    useEffect(()=>{
        peticionGet();
        },[])

  return (
    <div>
      <MultiSelect
        options={instruments}                                   
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default AddMusicalGenre;