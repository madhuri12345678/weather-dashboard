import React, { useContext, useState, useEffect } from "react";
import { WeatherContext } from "./context/WeatherContext";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ErrorMessage from "./components/ErrorMessage";
import Login from "./components/Login";
import { supabase } from "./supabaseClient";
import "./App.css";

function App() {
  const { weather, forecast, error, unit, getWeather, toggleUnit, loading } = useContext(WeatherContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <button onClick={toggleUnit}>
        Switch to {unit === "metric" ? "Fahrenheit (°F)" : "Celsius (°C)"}
      </button>
      <button onClick={handleLogout} style={{ marginLeft: "1rem", backgroundColor: "#dc3545" }}>
        Logout
      </button>

      <SearchBar onSearch={getWeather} />
      {loading && <p>Loading...</p>}
      <ErrorMessage error={error} />
      <WeatherDisplay weather={weather} unit={unit} />

     
      {forecast.length > 0 && (
        <div className="forecast">
          <h3>5-Day Forecast</h3>
          <div className="forecast-grid">
            {forecast.map((item, index) => (
              <div key={index} className="forecast-item">
                <p>{item.dt_txt}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="forecast icon"
                />
                <p>{item.main.temp}°{unit === "metric" ? "C" : "F"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
