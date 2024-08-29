import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import L from 'leaflet';

const continents = {
  Africa: 'Africa',
  Americas: 'Americas',
  Asia: 'Asia',
  Europe: 'Europe',
  Oceania: 'Oceania'
};

const customIcon = L.icon({
  iconUrl: '../map_mk.png', // Replace  the path to your custom icon image
  iconSize: [25, 41], // Size of the icon [width, height]
  iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -41], // Point from which the popup should open relative to the iconAnchor
});

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

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
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

      { selectedCountry === null && <div className="country-list">
        {filteredCountries.map(country => (
          <div
            key={country.cca3}
            className={`country-item ${selectedCountry?.cca3 === country.cca3 ? 'active' : ''}`}
            onClick={() => handleCountryClick(country)}
          >
            <h2>{country.name.common}</h2>
            <p>{country.capital && `Capital: ${country.capital[0]}`}</p>
          </div>
        ))}
      </div>}

      {selectedCountry && (
        <div className="country-details">
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital && selectedCountry.capital[0]}</p>
          <MapContainer
            center={[selectedCountry.latlng[0], selectedCountry.latlng[1]]}
            zoom={4}
            scrollWheelZoom={false}
            className="map"
            
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              
            />
            <Marker position={[selectedCountry.latlng[0], selectedCountry.latlng[1]]} icon={customIcon}>
              <Popup>
                {selectedCountry.name.common}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default App;