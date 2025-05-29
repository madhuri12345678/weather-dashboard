import React, { createContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "");
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // Track if user searched at least once

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const queryClient = useQueryClient();

  const fetchWeather = async () => {
    if (!city) return null;
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`
    );
    return res.data;
  };

  const fetchForecast = async () => {
    if (!city) return [];
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`
    );
    return res.data.list.slice(0, 40);
  };
  const {
  data: weather,
  refetch: refetchWeather,
  isLoading: loadingWeather,
  error: weatherError,
} = useQuery({
  queryKey: ["weather", city, unit],
  queryFn: fetchWeather,
  enabled: !!city,
  staleTime: 30000,
  retry: 1,
});

const {
  data: forecast = [],
  refetch: refetchForecast,
  isLoading: loadingForecast,
  error: forecastError,
} = useQuery({
  queryKey: ["forecast", city, unit],
  queryFn: fetchForecast,
  enabled: !!city,
  staleTime: 30000,
  retry: 1,
});
 
const loading = loadingWeather || loadingForecast;

  // Handle errors when they occur
  useEffect(() => {
    if (!hasSearched) {
      // No search yet, clear errors
      setError(null);
      return;
    }

    // If either weather or forecast errors exist, set error state
    if (weatherError || forecastError) {
      setError(weatherError || forecastError);
    } else {
      // No errors => clear error state
      setError(null);
    }
  }, [weatherError, forecastError, hasSearched]);

  const getWeather = (searchedCity) => {
    const trimmedCity = searchedCity.trim();
    if (!trimmedCity) {
      setError(null); // no error if input is empty
      return;
    }
    setCity(trimmedCity);
    localStorage.setItem("lastCity", trimmedCity);
    setHasSearched(true); // Mark that user searched at least once

    // Invalidate queries so React Query refetches
    queryClient.invalidateQueries(["weather"]);
    queryClient.invalidateQueries(["forecast"]);
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  };
  useEffect(() => {
  if (city) {
    refetchWeather();
    refetchForecast();
  }
}, [city, unit, refetchWeather,refetchForecast]);

  return (
  <WeatherContext.Provider
    value={{ weather, forecast, error, city, unit, getWeather, toggleUnit, loading }}
  >
    {children}
  </WeatherContext.Provider>
);

};
