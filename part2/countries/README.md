# Countries Application

A React application to search and view information about countries from around the world. This project implements exercises 2.18-2.20 from the Full Stack Open course.

## Features

- ✅ Search countries by name
- ✅ Display country details (capital, area, languages, flag)
- ✅ "Show" button for each country in list view
- ✅ Real-time weather data for capital cities
- ✅ Smart filtering (handles too many matches)
- ✅ Uses Open-Meteo API (no API key required!)

## Installation

```bash
npm install
```

## Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## How It Works

### Search Logic

- **Too many matches (>10)**: Shows "Too many matches, specify another filter"
- **2-10 matches**: Shows list of country names with "show" buttons
- **1 match**: Automatically displays full country details
- **0 matches**: Shows "No matches found"

### Country Details

When viewing a country, you'll see:
- Country name
- Capital city
- Total area
- List of languages spoken
- Country flag
- Current weather in the capital

## APIs Used

### REST Countries API
- **URL**: https://studies.cs.helsinki.fi/restcountries/
- **Purpose**: Country data (name, capital, area, languages, flag)
- **No API key required**

### Open-Meteo Weather API
- **URL**: https://open-meteo.com/
- **Purpose**: Real-time weather data
- **No API key required**
- **Free forever, no registration needed**

## Project Structure

```
countries/
├── src/
│   ├── components/
│   │   ├── CountryList.jsx      # List of countries with show buttons
│   │   ├── CountryDetail.jsx    # Single country details display
│   │   └── Weather.jsx          # Weather information component
│   ├── services/
│   │   ├── countries.js         # REST Countries API service
│   │   └── weather.js           # Open-Meteo weather API service
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Styles
├── index.html                   # HTML template
├── package.json                # Dependencies and scripts
└── vite.config.js             # Vite configuration
```

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **REST Countries API** - Country information
- **Open-Meteo API** - Weather data (no API key needed!)

## Exercises Implemented

- **2.18**: Basic country search and display
- **2.19**: Show buttons for country list
- **2.20**: Weather data integration

## Example Usage

1. Type "finland" in the search box
2. See Finland's details immediately (only 1 match)
3. View weather in Helsinki
4. Type "united" to see multiple countries
5. Click "show" button next to any country to view details

## Why Open-Meteo?

Unlike OpenWeatherMap which requires API key registration, Open-Meteo:
- ✅ No API key needed
- ✅ No registration required
- ✅ Completely free
- ✅ No rate limits
- ✅ Works immediately

Perfect for learning projects!

## License

MIT