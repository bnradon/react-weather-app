import Sunny from "./Sunny/Sunny";
// import Cloudy from "./Cloudy/Cloudy";
import Rainy from "./Rainy/rainy";
// import Stormy from "./Stormy/Stormy";
// import Foggy from "./Foggy/Foggy";
// import Night from "./Night/Night";
// import Snowy from "./Snowy/Snowy";


function WeatherBg({ code, isDay }) {

//   if (!isDay) return <Night />;

if (code === 0) return <Sunny />;


  if ([1, 2].includes(code)) return <Cloudy />;
  if (code === 3) return <Cloudy />;
  if ([45, 48].includes(code)) return <Foggy />;

  
  if ([51, 53, 55, 56, 57].includes(code)) return 
  
  <Rainy
    />;

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return <Rainy />;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return <Snowy />;
  if ([95, 96, 99].includes(code)) return <Stormy />;
  return "Condición variable";




//   if ([1, 2, 3].includes(code)) return <Cloudy />;

//   if ([45, 48].includes(code)) return <Foggy />; if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
//     return <Rainy />;
//   }

//   if ([95, 96, 99].includes(code)) return <Stormy />;

//   return <Cloudy />;
}

export default WeatherBg;