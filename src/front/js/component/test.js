import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import axios from "axios";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry"}
];


const Example = () => {
    const peticionGet=async()=>{
        await axios.get("https://3001-holyfs-proyectofinal-reo9cfu8fdi.ws-eu54.gitpod.io/api/instruments")
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
/*         let instruns=instruments.map((instruments)=>(
            <>{JSON.stringify(instruments.name)}
                </> 
                ))  */

  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={instruments}                                   
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
  );
};

export default Example;