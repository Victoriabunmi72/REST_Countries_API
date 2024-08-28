// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

const continents = {
  Africa: 'Africa',
  Americas: 'Americas',
  Asia: 'Asia',
  Europe: 'Europe',
  Oceania: 'Oceania'
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleContinentClick = (continent) => {
    const filtered = countries.filter(country => country.region === continent);
    setFilteredCountries(filtered);
    setSelectedCountry(null);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const country = countries.find(c => c.name.common.toLowerCase() === search.toLowerCase());
    if (country) {
      setSelectedCountry(country);
      setFilteredCountries([country]);
    }
  };

  return (
    <div className="app">
      <h1>Country Explorer</h1>
      <div className="continent-buttons">
        {Object.keys(continents).map(continent => (
          <button key={continent} onClick={() => handleContinentClick(continents[continent])}>
            {continent}
          </button>
        ))}
      </div>

      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a country"
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      <div className="country-list">
        {filteredCountries.map(country => (
          <div
            key={country.cca3}
            className="country-item"
            onClick={() => setSelectedCountry(country)}
          >
            <h2>{country.name.common}</h2>
            <p>{country.capital && `Capital: ${country.capital[0]}`}</p>
          </div>
        ))}
      </div>

      {selectedCountry && (
        <MapContainer
          center={[selectedCountry.latlng[0], selectedCountry.latlng[1]]}
          zoom={4}
          scrollWheelZoom={false}
          className="map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[selectedCountry.latlng[0], selectedCountry.latlng[1]]}>
            <Popup>
              {selectedCountry.name.common}
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
}

export default App;