import React, {useState, useEffect} from 'react'
import "../../styles/SearchComponent.css";

const SearchComponent = () => {
    //setear los hooks useState
    const [ photo, setPhotos ] = useState([])
    const [ search, setSearch ] = useState("")
  
    //función para traer los datos de la API
    const URL = 'https://jsonplaceholder.typicode.com/photos'

    const showData = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        //console.log(data)
        setPhotos(data)
      } 
         //función de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value)   
}
//metodo de filtrado 2   
const results = !search ? photo : photo.filter((dato)=> dato.title.toLowerCase().includes(search.toLocaleLowerCase()))
  
useEffect( ()=> {
 showData()
}, [])

//renderizamos la vista
return (
    <>
    <div class="input-group mb-3">
        <input value={search} onChange={searcher} type="text" placeholder='Name' className='form-control'/>
    </div>
    <div>
        <table className='table table-striped table-hover mt-5 shadow-lg'>
            <thead>
                <tr className='bg-curso text-white'>
                    <th>Perfil</th>
                </tr>
            </thead>
            <tbody>
                { results.map( (photo) => (
                    <tr key={photo.id}>
                        <td>{photo.title}</td>
                    </tr>                    
                ))}
            </tbody>
        </table>
    </div>
</>
  )
}
export default SearchComponent