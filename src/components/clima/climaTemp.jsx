function climaTemp({ main }) {

return(
<div    className='clima-container'>

       <h4>Condiciones 🌡️</h4>
         
      <p>Humedad: {main.humidity} %</p>
      <p>Presión Atmosférica: {main.pressure} hPa</p>

      <p>Temp. Mínima: {main.temp_min} °C  ↓</p>
      <p>Temp. Máxima: {main.temp_max} °C  ↑ </p>

  
      </div>
);
}

export default climaTemp;
