import axios from 'axios'

const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const getWeather = (latitude, longitude) => {
  const request = axios.get(
    `${baseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  )
  return request.then(response => {
    const current = response.data.current_weather
    return {
      temperature: current.temperature,
      windSpeed: current.windspeed,
      weatherDescription: getWeatherDescription(current.weathercode)
    }
  })
}

const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail'
  }
  return weatherCodes[code] || 'Unknown'
}

export default { getWeather }