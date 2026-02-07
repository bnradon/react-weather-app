import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';

function ClimaRadar({ clima }) {
  if (!clima) return null; 

  function normalizeTemp(temp) {
  const min = -20; 
  const max = 40;  
  if (temp < min) temp = min;
  if (temp > max) temp = max;
  return (temp - min) / (max - min); 
}


  const data = [
    {
      data: {
        Temp: normalizeTemp(clima.main.temp),            
        Humedad: clima.main.humidity / 100,    
        Viento: clima.wind.speed / 20,         
        Nubosidad: clima.clouds.all / 100,     
        Visibilidad: clima.visibility / 10000, 
      },
      meta: { color: '#FFC300' } 
    }
  ];

 


  const captions = {
    Temp: 'Temperatura',
    Humedad: 'Humedad',
    Viento: 'Viento',
    Nubosidad: 'Nubosidad',
    Visibilidad: 'Visibilidad'
  };

  const options = {
   
    captionsTextSize: 14,
    captionsTextColor: '#ac3d3d',
    dataFillOpacity: 0.6,   
    stroke: ['#FFC300'],    
    strokeWidth: [2],
    dots: true,            
    
  captionProps: () => ({
    className: 'caption',
    textAnchor: 'middle',
    fontSize: 10,
    fontFamily: 'sans-serif'
  }),

    dotProps: () => ({ r: 3, fill: '#ff9100' })
  };

  return (
    <div className="clima-container">
      <h4>Radar Climático 🌦️</h4>
      <RadarChart
        captions={captions}
        data={data}
        size={300}
        options={options}
      />
    </div>
  );
}

export default ClimaRadar;