import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import SearchBar from "./components/searchbar.jsx";
import Loader from "./components/Loader.jsx";
import ClimaMain from "./components/clima/climaMain.jsx"
import ClimaTemp from "./components/clima/climaTemp.jsx"
import ClimaViento from "./components/clima/climaViento.jsx"
import ClimaSol from "./components/clima/climaSol.jsx";
import ClimaRadar from "./components/climaRadar.jsx";

function App() {

  
  

  const [clima, setClima] = useState(null)
  const [error, setError] = useState(null)
  const [ciudad, setCiudad] = useState("")
  const [loading, setLoading] = useState(false)






  //Persistencia de datos

  useEffect(() => {
   const lastCiudad = localStorage.getItem('data')

   
    if (lastCiudad) {
      try { 
      const climaSave = JSON.parse(lastCiudad)
        setClima(climaSave)
        
      } catch (e) {
      console.error("Error leyendo localStorage:", e)
        localStorage.removeItem('data')
        
      }

    } else {
       console.log('Ciudad no encontrada en localStorage.');
     }
  
    return () => {
      
    }

  }, [])





  
  
  const busqueda = async (ciudad) =>{
    
    if (!ciudad.trim()) {
      setError("Por favor, introduce el nombre de una ciudad.");
      setClima(null);
      return;
    }


    setClima(null);
    setError(null);

    const APIKEY = import.meta.env.VITE_CLIMA_KEY;
    const URL_BASE = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${APIKEY}&units=metric&lang=es`
    


    try {
      setLoading(true) 
      const response = await fetch(URL_BASE)
      const data = await response.json()
    

      if (data.cod == 200) {
        
        setLoading(false)
        setClima(data)
        console.log(data)

        // Guardar en localStorage
    
        localStorage.setItem("data", JSON.stringify(data))


      
      } else if (data.cod == 404 || data.cod == "404") {
     
        setError(`No se encontraron resultados para "${ciudad}". Por favor, revisa el nombre.`);
      
      } else {
    
        setError(`Error ${data.cod}: ${data.message || 'Error desconocido de la API.'}`);
      } 

    } catch (fetchError) {
      console.error("Error cargando datos:", fetchError)
      setError("❌ Error de red. Intenta de nuevo.");
    
    } finally {
      setLoading(false)
    }
  }

  


  return (
    <div className="App">
      {}
      <h1>
        ClimApp
      </h1>
      <SearchBar ciudad={ciudad} setCiudad={setCiudad} onSearch={busqueda}/> 
      
      <hr className='my-4'/>
      {loading && <Loader loading={loading}/>}
      
      {!clima && !error && <p></p>}
      
    {error && <div className="error-message">{error}</div>}


      {clima && !error && (
        <div className="container mt-4"> 
        

          <div className="row justify-content-center">
            

            {/* Principal */}
            <div className="col-12 mb-5">
              <ClimaMain clima={clima} />
            </div>



            <div className="col-12">
    <div className="row">
      <div className="col-12 col-md-6 mb-4">
        <ClimaTemp main={clima.main} />
      </div>

      <div className="col-12 col-md-6 mb-4">
        <ClimaViento wind={clima.wind} visibility={clima.visibility} />
      </div>

      <div className="col-12 col-md-6 mb-4">
        <ClimaSol sys={clima.sys} timezone={clima.timezone} />
      </div>

          <div className="col-12 col-md-6 mb-4">

        <ClimaRadar clima={clima} />
      </div>
    
      

    </div>
  </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default App
 
