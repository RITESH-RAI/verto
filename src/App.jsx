import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import DateTime from "./components/DateTime";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import "./index.css";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastCity, setLastCity] = useState("");
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const savedCity = localStorage.getItem("lastCity");
    if (savedCity) {
      setLastCity(savedCity);
      fetchWeather(savedCity, unit);
    }
  }, []);

  async function fetchWeather(city, selectedUnit = unit) {
    if (!API_KEY) return setError("⚠️ Missing API key in .env file");

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=${selectedUnit}&appid=${API_KEY}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "City not found");
      setWeather(data);

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&units=${selectedUnit}&appid=${API_KEY}`
      );
      const forecastData = await resForecast.json();
      if (!resForecast.ok) throw new Error(forecastData.message || "Forecast not found");

      setForecast(forecastData.list.filter((e) => e.dt_txt.includes("12:00:00")));

      localStorage.setItem("lastCity", city);
      setLastCity(city);
    } catch (err) {
      setWeather(null);
      setForecast([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleUnitToggle = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    if (lastCity) fetchWeather(lastCity, newUnit);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🌤 Weather App</h1>
      <DateTime />

      <div className="unit-toggle">
        <button onClick={handleUnitToggle}>
          Show in {unit === "metric" ? "°F" : "°C"}
        </button>
      </div>

      <SearchBar onSearch={fetchWeather} initialCity={lastCity} />
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherDisplay data={weather} unit={unit} />}
      {forecast.length > 0 && <ForecastDisplay data={forecast} unit={unit} />}

      <p className="last-city-note">
        Last searched city: <b>{lastCity || "None"}</b>
      </p>
    </div>
  );
}
