import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import config from "../config";



const AddMusicalInstruments = () => {
    const peticionGet=async()=>{
        await axios.get(`${config.hostname}/api/instruments`)
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


export default AddMusicalInstruments;
