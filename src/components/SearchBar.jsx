import React, { useState, useEffect } from "react";

const GEO_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function SearchBar({ onSearch, initialCity }) {
  const [city, setCity] = useState(initialCity || "");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            city
          )}&limit=5&appid=${GEO_API_KEY}`
        );
        const data = await res.json();
        setSuggestions(data.map((c) => `${c.name}, ${c.country}`));
      } catch (err) {
        console.error("Error fetching city suggestions:", err);
      }
    };

    fetchCities();
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    handleSearch(city);
  };

  const handleSearch = (selectedCity) => {
    setCity(selectedCity);
    onSearch(selectedCity);

    const newHistory = [selectedCity, ...history.filter((c) => c !== selectedCity)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));

    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s) => (
            <li key={s} onClick={() => handleSearch(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}

      {history.length > 0 && (
        <div className="search-history">
          <p>Recent Search History:</p>
          <ul>
            {history.map((h) => (
              <li key={h} onClick={() => handleSearch(h)}>
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
