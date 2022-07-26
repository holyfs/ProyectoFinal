import React, {useEffect, useState} from 'react';
import axios from "axios";

function AddMusicalInstruments(){
  const [instruments, setInstruments]= useState([]);
  const [tablaInstruments, setTablaInstruments]= useState([]);
    const peticionGet=async()=>{
        await axios.get("https://3001-holyfs-proyectofinal-a0l3bowyf2k.ws-eu54.gitpod.io/api/instruments")
        .then(response=>{
          setInstruments(response.data);
          setTablaInstruments(response.data);
        }).catch(error=>{
          console.log(error);
        })
      }
      useEffect(()=>{
        peticionGet();
        },[])
return(<>
<h1>Instruments</h1>
<div className="dropdown">
  <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown link
  </a>

  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Action</a></li>
    <li><a className="dropdown-item" href="#">Another action</a></li>
    <li><a className="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
{/*   {instruments.map((instruments)=>(
   <h2>{instruments.name}</h2> 
  ))} */}


</>);
}
export default AddMusicalInstruments;