const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherByCity(city) {
  const geoParams = new URLSearchParams({
    name: city.trim(),
    count: "1",
    language: "es",
    format: "json",
  });

  const geoResponse = await fetch(`${GEOCODING_URL}?${geoParams}`);
  if (!geoResponse.ok) throw new Error("No pudimos buscar esa ciudad. Inténtalo de nuevo.");

  const geoData = await geoResponse.json();
  const place = geoData.results?.[0];
  if (!place) throw new Error(`No encontramos resultados para "${city}". Revisa el nombre e inténtalo otra vez.`);

  const params = new URLSearchParams({
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "weather_code",
      "cloud_cover",
      "pressure_msl",
      "wind_speed_10m",
      "wind_direction_10m",
      "wind_gusts_10m",
    ].join(","),
    hourly: ["temperature_2m", "precipitation_probability", "weather_code"].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
      "precipitation_probability_max",
    ].join(","),
    timezone: "auto",
    forecast_days: "7",
  });

  const weatherResponse = await fetch(`${FORECAST_URL}?${params}`);
  if (!weatherResponse.ok) throw new Error("No pudimos obtener el pronóstico del clima.");
  const weather = await weatherResponse.json();

  return {
    place: {
      name: place.name,
      admin1: place.admin1,
      country: place.country,
      countryCode: place.country_code,
      timezone: place.timezone,
    },
    ...weather,
  };
}

export function getWeatherLabel(code) {
  if (code === 0) return "Despejado";
  if ([1, 2].includes(code)) return "Parcialmente nublado";
  if (code === 3) return "Nublado";
  if ([45, 48].includes(code)) return "Niebla";
  if ([51, 53, 55, 56, 57].includes(code)) return "Llovizna";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Lluvia";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "Nieve";
  if ([95, 96, 99].includes(code)) return "Tormenta";
  return "Condición variable";
}

export function getWeatherIcon(code, isDay = true) {
  if (code === 0) return isDay ? "☀️" : "🌙";
  if ([1, 2].includes(code)) return isDay ? "🌤️" : "☁️";
  if ([3, 45, 48].includes(code)) return "☁️";
  if ([51, 53, 55, 56, 57].includes(code)) return "🌦️";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "🌧️";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
  if ([95, 96, 99].includes(code)) return "⛈️";
  return "🌡️";
}
