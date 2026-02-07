import IconosAnimados from "../iconosAnimados.jsx";


function climaMain({clima}) {
  
  function horaCiudad(timezone){
    const horaActual = new Date();    

    const horaMinutos= horaActual.getTimezoneOffset() * 60;
    const utc = (horaActual.getTime() / 1000) + horaMinutos;
    const horaCiudadSeg = utc + timezone;

    const fechaCiudad = new Date(horaCiudadSeg * 1000);

    return fechaCiudad;  
    }

    const horaFinal = horaCiudad(clima.timezone)

return (

  <div className="card-clima">
    {/* Columna izquierda: icono animado */}
    <div className="clima-icono">
      <IconosAnimados iconCode={clima.weather[0].icon} />
      <h6 style={{ textTransform: "capitalize" }}>{clima.weather[0].description}</h6>
    </div>

    {clima.sys.country ? (
  <div>
      <h2>{clima.name}</h2>
    <h6>{clima.sys.country}</h6>
    <img 
      src={`https://flagsapi.com/${clima.sys.country.toUpperCase()}/flat/48.png`}
      alt="bandera"
    />

   <h3>
        {horaFinal.toLocaleTimeString([],{
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        })}
      </h3>
      
      <h6>🌡 Temperatura Actual : {clima.main.temp} °C</h6>
      <h6>🧊 Sensación Térmica : {clima.main.feels_like} °C</h6>

  </div>
) : (
  <h6>País desconocido</h6>
)}
   
    </div>
  
);
}

export default climaMain;
