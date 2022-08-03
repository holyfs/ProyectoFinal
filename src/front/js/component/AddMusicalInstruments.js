import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";
import config from "../config";


const AddMusicalInstruments = (props) => {
  const [selected, setSelected] = useState([]);
  const [instruments, setInstruments]= useState([]);
  const [tablaInstruments, setTablaInstruments]= useState([]);

    const peticionGet=async()=>{
        await axios.get(`${config.hostname}/api/instruments`)
        .then(response=>{
          setInstruments(response.data);
          setTablaInstruments(response.data);
        }).catch(error=>{
          console.log(error);
        })
      } 

    useEffect(()=>{
        peticionGet();
        if (props.userInstruments.length > 0){
        setSelected(props.userInstruments)
        props.selectionEvent(props.userInstruments, "I")
      }else{
        setSelected([])
        props.selectionEvent([], "I")
      }
        },[])

        const handleEvent= (event)=>{
    
          setSelected(event)
          props.selectionEvent(event, "I")
        }

  return (
    <div>
      <MultiSelect
        options={instruments}                                   
        value={selected}
        onChange={(e)=>handleEvent(e)}
      />
    </div>
  );
};


export default AddMusicalInstruments;
