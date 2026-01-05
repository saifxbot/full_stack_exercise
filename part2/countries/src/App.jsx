import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'
import countryService from './services/countries'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredCountries([])
      setSelectedCountry(null)
      return
    }

    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    setFilteredCountries(filtered)
    
    if (filtered.length === 1) {
      setSelectedCountry(filtered[0])
    } else {
      setSelectedCountry(null)
    }
  }, [searchTerm, countries])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleShowCountry = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <h1>Country Information</h1>
      <div>
        find countries: <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      
      {searchTerm && (
        <>
          {filteredCountries.length > 10 && (
            <p>Too many matches, specify another filter</p>
          )}
          
          {filteredCountries.length > 1 && filteredCountries.length <= 10 && !selectedCountry && (
            <CountryList countries={filteredCountries} onShowCountry={handleShowCountry} />
          )}
          
          {(filteredCountries.length === 1 || selectedCountry) && (
            <CountryDetail country={selectedCountry || filteredCountries[0]} />
          )}
          
          {filteredCountries.length === 0 && (
            <p>No matches found</p>
          )}
        </>
      )}
    </div>
  )
}

export default App