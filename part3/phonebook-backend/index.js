const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Custom morgan token to log POST request body (Exercise 3.8)
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

// Morgan logging middleware (Exercise 3.7 & 3.8)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Initial data
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
  const date = new Date()
  const personCount = persons.length
  
  response.send(`
    <p>Phonebook has info for ${personCount} people</p>
    <p>${date}</p>
  `)
})

// Exercise 3.3: Get single person
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Exercise 3.4: Delete person
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  
  response.status(204).end()
})

// Exercise 3.5 & 3.6: Add new person with validation
app.post('/api/persons', (request, response) => {
  const body = request.body
  
  // Exercise 3.6: Validation - missing name or number
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number is missing' 
    })
  }
  
  // Exercise 3.6: Validation - name must be unique
  const nameExists = persons.find(p => p.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }
  
  // Exercise 3.5: Generate random ID
  const id = String(Math.floor(Math.random() * 1000000))
  
  const person = {
    id: id,
    name: body.name,
    number: body.number
  }
  
  persons = persons.concat(person)
  
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})