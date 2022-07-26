import React, {useEffect, useState} from 'react';
import axios from "axios";

function AddMusicalInstruments(){

    const peticionGet=async()=>{
        await axios.get(process.env.BACKEND_URL + "api/instruments")
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


</>);
}
export default Search;