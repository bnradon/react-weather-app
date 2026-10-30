import { useEffect, useState } from "react";
import SearchBar from "./components/searchbar.jsx";
import { getWeatherByCity, getWeatherIcon, getWeatherLabel } from "./services/weatherService.js";
import "./App.css";

const formatHour = (value) =>
  new Intl.DateTimeFormat("es-CO", { hour: "numeric", minute: "2-digit" }).format(new Date(value));

const formatDay = (value) =>
  new Intl.DateTimeFormat("es-CO", { weekday: "short", day: "numeric" }).format(new Date(`${value}T12:00:00`));

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("climapp-weather")) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchWeather = async (searchCity) => {
    if (!searchCity.trim()) {
      setError("Escribe el nombre de una ciudad para comenzar.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const result = await getWeatherByCity(searchCity);
      setWeather(result);
      setCity(result.place.name);
      localStorage.setItem("climapp-weather", JSON.stringify(result));
    } catch (err) {
      setError(err.message || "Ocurrió un error al consultar el clima.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!weather) searchWeather("Pereira");
    // La carga inicial se realiza una sola vez.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = weather?.current;
  const daily = weather?.daily;
  const hourly = weather?.hourly;
  const currentHour = hourly?.time?.findIndex((time) => new Date(time) >= new Date()) ?? 0;
  const nextHours = hourly && currentHour >= 0
    ? hourly.time.slice(currentHour, currentHour + 12).map((time, index) => ({
        time,
        temperature: hourly.temperature_2m[currentHour + index],
        rain: hourly.precipitation_probability[currentHour + index],
        code: hourly.weather_code[currentHour + index],
      }))
    : [];

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="ClimApp inicio">
          <span className="brand-mark">☀</span>
          <span>clim<span>app</span></span>
        </a>
        <span className="api-note"><span className="status-dot" /> Datos de Open-Meteo</span>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">EL CLIMA, A TU MANERA</p>
          <h1>Un día más <span>brillante.</span></h1>
          <p className="hero-description">Consulta el tiempo ahora y descubre qué viene en las próximas horas.</p>
        </div>
        <SearchBar city={city} setCity={setCity} onSearch={searchWeather} />
      </section>

      {error && <div className="error-message" role="alert">{error}</div>}
      {loading && <div className="loading-state"><span className="loader-orbit" /> Consultando el clima...</div>}

      {weather && current && daily && !loading && (
        <div className="weather-content">
          <section className="current-card">
            <div className="current-topline">
              <div>
                <p className="eyebrow light">AHORA MISMO</p>
                <h2>{weather.place.name}</h2>
                <p className="location-subtitle">{[weather.place.admin1, weather.place.country].filter(Boolean).join(", ")}</p>
              </div>
              <span className="weather-emoji" aria-hidden="true">
                {getWeatherIcon(current.weather_code, Boolean(current.is_day))}
              </span>
            </div>
            <div className="temperature-row">
              <strong>{Math.round(current.temperature_2m)}°</strong>
              <div>
                <p className="condition">{getWeatherLabel(current.weather_code)}</p>
                <p className="feels-like">Sensación térmica {Math.round(current.apparent_temperature)}°</p>
              </div>
            </div>
            <div className="current-footer">
              <span>💧 Humedad <b>{current.relative_humidity_2m}%</b></span>
              <span>💨 Viento <b>{Math.round(current.wind_speed_10m)} km/h</b></span>
              <span>☁️ Nubosidad <b>{current.cloud_cover}%</b></span>
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <div><p className="eyebrow">NO PIERDAS EL RITMO</p><h2>Próximas horas</h2></div>
              <span className="section-hint">Pronóstico por hora</span>
            </div>
            <div className="hourly-list">
              {nextHours.map((hour, index) => (
                <article className={index === 0 ? "hour-card active" : "hour-card"} key={hour.time}>
                  <span className="hour-label">{index === 0 ? "Ahora" : formatHour(hour.time)}</span>
                  <span className="hour-icon">{getWeatherIcon(hour.code)}</span>
                  <strong>{Math.round(hour.temperature)}°</strong>
                  <span className="rain-chance">💧 {hour.rain ?? 0}%</span>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <div><p className="eyebrow">PLANEA TU SEMANA</p><h2>Próximos 7 días</h2></div>
              <span className="section-hint">Máximas y mínimas</span>
            </div>
            <div className="weekly-card">
              {daily.time.map((day, index) => (
                <div className="day-row" key={day}>
                  <span className="day-name">{index === 0 ? "Hoy" : formatDay(day)}</span>
                  <span className="day-condition">{getWeatherIcon(daily.weather_code[index])} <span>{getWeatherLabel(daily.weather_code[index])}</span></span>
                  <div className="temperature-range">
                    <span>{Math.round(daily.temperature_2m_min[index])}°</span>
                    <div className="range-track"><i style={{ left: "15%", width: "70%" }} /></div>
                    <b>{Math.round(daily.temperature_2m_max[index])}°</b>
                  </div>
                  <span className="day-rain">💧 {daily.precipitation_probability_max[index] ?? 0}%</span>
                </div>
              ))}
            </div>
          </section>

          <section className="details-grid">
            <article className="detail-card detail-lilac"><span>🌅</span><p>AMANECER</p><strong>{formatHour(daily.sunrise[0])}</strong></article>
            <article className="detail-card detail-peach"><span>🌇</span><p>ATARDECER</p><strong>{formatHour(daily.sunset[0])}</strong></article>
            <article className="detail-card detail-mint"><span>☀️</span><p>ÍNDICE UV MÁX.</p><strong>{Math.round(daily.uv_index_max[0])}</strong></article>
            <article className="detail-card detail-blue"><span>🌬️</span><p>RÁFAGAS</p><strong>{Math.round(current.wind_gusts_10m)} <small>km/h</small></strong></article>
          </section>
        </div>
      )}

      <footer className="footer">
        <span>Hecho para mirar el cielo ☁️</span>
        <span>Pronóstico proporcionado por Open-Meteo</span>
      </footer>
    </main>
  );
}

export default App;
