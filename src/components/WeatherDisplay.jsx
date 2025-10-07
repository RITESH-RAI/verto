import React from "react";

export default function WeatherDisplay({ data, unit }) {
  if (!data) return null;

  const { name, main, weather, wind } = data;

  const icon = weather[0].icon;
  const isDay = icon.endsWith("d");


  const weatherBackgrounds = {
    Clear: {
      day: "url('/clear-day.jpg')",
      night: "url('/clear-night.jpg')",
    },
    Clouds: {
      day: "url('/clouds-day.jpg')",
      night: "url('/clouds-night.jpg')",
    },
    Rain: {
      day: "url('/rain-day.jpg')",
      night: "url('/rain-night.jpg')",
    },
    Drizzle: {
      day: "url('/Drizzle-day.jpg')",
      night: "url('/Drizzle-night.jpg')",
    },
    Thunderstorm: {
      day: "url('/thunderstorm-day.jpg')",
      night: "url('/thunderstorm-night.jpg')",
    },
    Snow: {
      day: "url('/snow-day.jpg')",
      night: "url('/snow-night.jpg')",
    },
    Mist: {
      day: "url('/Mist-day.jpg')",
      night: "url('/Mist-night.jpg')",
    },
  };

  const backgroundStyle = {
    backgroundImage: weatherBackgrounds[weather[0].main]?.[isDay ? "day" : "night"] || "url('/default.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "8px",
    padding: "20px",
    color: isDay ? "#000" : "#fff",
    textAlign: "center",
  };

  return (
   <div className="weather-box" style={backgroundStyle}>
  <div className="city-daynight">
    <h2 className="weather-city">{name}</h2>
    <span className="weather-daynight">{isDay ? "🌞 Day" : "🌙 Night"}</span>
  </div>

  <p className="weather-temp">
    {Math.round(main.temp)}°{unit === "metric" ? "C" : "F"}
  </p>
  <p className="weather-condition">{weather[0].main}</p>
  <p className="weather-humidity">Humidity: {main.humidity}%</p>
  <p className="weather-wind">
    Wind: {wind.speed} {unit === "metric" ? "m/s" : "mph"}
  </p>
</div>
  );
}
