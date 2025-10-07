import React from "react";

export default function ForecastDisplay({ data, unit }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="forecast-box">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {data.map((day) => {
          const date = new Date(day.dt_txt);
          const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
          const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

          return (
            <div key={day.dt} className="forecast-card">
              <p className="forecast-day">{weekday}</p>
              <p className="forecast-date">{monthDay}</p>
              <img
                className="forecast-icon"
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
              <p className="forecast-temp">
                {Math.round(day.main.temp)}°{unit === "metric" ? "C" : "F"}
              </p>
              <p className="forecast-condition">{day.weather[0].main}</p>
              <p className="forecast-wind">
                Wind Speed: {day.wind.speed} {unit === "metric" ? "m/s" : "mph"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
