# Rest Countries Map Explorer

Rest Countries Map Explorer is a React application that allows users to explore countries by continent and search for specific countries. The app displays country details along with their location on an interactive map powered by React Leaflet.

## Features

- **Continent Selection:** Buttons for each continent allow users to filter and display countries by region.
- **Country Search:** A search bar enables users to search for a specific country by name.
- **Interactive Map:** Displays the location of the selected country on an interactive map.
- **Country Details:** View details such as the capital of the selected country.

## Technologies Used

- **React:** JavaScript library for building user interfaces.
- **React Leaflet:** Library for integrating Leaflet maps in React applications.
- **Axios:** Promise-based HTTP client for making API requests.
- **Rest Countries API:** API used to fetch data about countries.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/rest-countries-map.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd rest-countries-map
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

5. **Open the application in your browser:**
   - Navigate to `http://localhost:3000`

## Usage

1. **Select a Continent:** Click on one of the continent buttons (Africa, Americas, Asia, Europe, Oceania) to display the countries in that continent.
2. **Search for a Country:** Use the search bar to find a specific country by name.
3. **View Country Details:** Click on a country to see its details and view its location on the map.

## Project Structure

- `src/App.js`: Main component that manages the state and renders the buttons, search bar, and map.
- `src/App.css`: Contains the styling for the application.
- `public/index.html`: The HTML file that contains the root element.

## Known Issues

- The app currently displays a warning about deprecated packages during installation. This doesn’t affect the core functionality but should be addressed in future updates.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **Rest Countries API** for providing comprehensive data about countries.
- **React Leaflet** for the easy integration of maps in React.