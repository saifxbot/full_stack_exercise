import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        showNotification('Failed to fetch persons from server', 'error')
      })
  }, [])

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    
    if (newName.trim() === '') {
      showNotification('Name cannot be empty', 'error')
      return
    }

    if (newNumber.trim() === '') {
      showNotification('Number cannot be empty', 'error')
      return
    }

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      if (window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )) {
        const updatedPerson = { ...existingPerson, number: newNumber }
        
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            showNotification(`Updated ${returnedPerson.name}'s number`, 'success')
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              showNotification(
                `Information of ${existingPerson.name} has already been removed from server`,
                'error'
              )
              setPersons(persons.filter(p => p.id !== existingPerson.id))
            } else {
              showNotification(
                `Failed to update ${existingPerson.name}'s number`,
                'error'
              )
            }
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showNotification(`Added ${returnedPerson.name}`, 'success')
      })
      .catch(error => {
        showNotification('Failed to add person', 'error')
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showNotification(`Deleted ${person.name}`, 'success')
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            showNotification(
              `Information of ${person.name} has already been removed from server`,
              'error'
            )
          } else {
            showNotification(`Failed to delete ${person.name}`, 'error')
          }
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const personsToShow = searchTerm === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App