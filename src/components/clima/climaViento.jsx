function climaViento({ wind, visibility }) {


      const direccion = (deg) => {
            if (deg >= 0 && deg < 90) return "Norte ↑"
            if (deg >= 90 && deg < 180) return "Este →";
            if (deg >= 180 && deg < 270) return "Sur ↓";
            if (deg >= 270 && deg < 360) return "Oeste ←";
            return;
      }

return(
<div    className='clima-container'>

       <h4>Viento 💨</h4>
      <p>Velocidad: {wind.speed} m/s</p>
      <p>Dirección:  {wind.deg}° ({direccion(wind.deg)})</p>
      <p>Visibilidad: {visibility / 1000} km</p>


      </div>
);
}

export default climaViento;
