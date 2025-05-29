import React from "react";

function WeatherDisplay({ weather, unit }) {
  if (!weather) return null;

  return (
    <div className="weather-info">
      <h2>{weather.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>Temperature: {weather.main.temp}°{unit === "metric" ? "C" : "F"}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherDisplay;
