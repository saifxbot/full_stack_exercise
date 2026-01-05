import Weather from './Weather'

const CountryDetail = ({ country }) => {
  const languages = Object.values(country.languages || {})
  
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital: {country.capital?.[0]}</div>
      <div>area: {country.area}</div>
      
      <h3>languages:</h3>
      <ul>
        {languages.map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      
      <img 
        src={country.flags.png} 
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
      
      {country.capital?.[0] && (
        <Weather 
          city={country.capital[0]} 
          countryCode={country.cca2}
          latitude={country.capitalInfo?.latlng?.[0]}
          longitude={country.capitalInfo?.latlng?.[1]}
        />
      )}
    </div>
  )
}

export default CountryDetail