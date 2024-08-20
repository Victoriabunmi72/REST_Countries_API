const API_URL = 'https://restcountries.com/v3.1/all';

async function fetchCountries() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

async function getCountriesByContinent(continent) {
    const countries = await fetchCountries();
    const filteredCountries = countries.filter(country =>
        country.continents.includes(continent)
    );
    displayCountries(filteredCountries);
}

function displayCountries(countries) {
    const countryDetails = document.getElementById('countryDetails');
    countryDetails.innerHTML = ''; // Clear previous results

    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.innerHTML = `
            <h3>${country.name.common}</h3>
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <p><strong>Subregion:</strong> ${country.subregion}</p>
            <iframe
                width="600"
                height="450"
                style="border:0"
                loading="lazy"
                allowfullscreen
                src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${country.name.common}">
            </iframe>
            <hr>
        `;
        countryDetails.appendChild(countryDiv);
    });
}

async function searchCountry() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const countries = await fetchCountries();
    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchInput)
    );
    displayCountries(filteredCountries);
}