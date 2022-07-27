import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";



const AddMusicalInstruments = () => {
    const peticionGet=async()=>{
        await axios.get("https://3001-holyfs-proyectofinal-zmvgflr5rep.ws-eu54.gitpod.io/api/instruments")
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

  
}
export default AddMusicalInstruments;
