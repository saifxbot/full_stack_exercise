import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ city, latitude, longitude }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (latitude && longitude) {
      weatherService
        .getWeather(latitude, longitude)
        .then(data => {
          setWeather(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching weather:', error)
          setLoading(false)
        })
    }
  }, [latitude, longitude])

  if (loading) {
    return <div>Loading weather...</div>
  }

  if (!weather) {
    return <div>Unable to load weather data</div>
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <div><strong>temperature:</strong> {weather.temperature} °C</div>
      <div><strong>wind:</strong> {weather.windSpeed} m/s</div>
      <div><strong>weather:</strong> {weather.weatherDescription}</div>
    </div>
  )
}

export default Weather