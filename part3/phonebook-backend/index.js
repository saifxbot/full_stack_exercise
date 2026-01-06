const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Custom morgan token for POST body (Exercise 3.8)
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// Morgan logging middleware (Exercise 3.7 & 3.8)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Initial hardcoded data (Exercise 3.1)
let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// Exercise 3.1: Get all persons
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Exercise 3.2: Info page
app.get('/info', (request, response) => {
  const timestamp = new Date()
  const count = persons.length
  
  response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${timestamp}</p>
  `)
})

// Exercise 3.3: Get single person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).json({ error: 'person not found' })
  }
})

// Exercise 3.4: Delete person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const personExists = persons.find(p => p.id === id)
  
  if (!personExists) {
    return response.status(404).json({ error: 'person not found' })
  }
  
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

// Exercise 3.5 & 3.6: Add new person with validation
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  // Exercise 3.6: Validation - check if name is missing
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is required' 
    })
  }
  
  // Exercise 3.6: Validation - check if number is missing
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is required' 
    })
  }
  
  // Exercise 3.6: Validation - check if name already exists
  const nameExists = persons.find(
    p => p.name.toLowerCase() === body.name.toLowerCase()
  )
  
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  
  // Exercise 3.5: Generate random ID
  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number
  }
  
  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})