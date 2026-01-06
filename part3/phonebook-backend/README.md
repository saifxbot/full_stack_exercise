# Phonebook Backend - Part 3

Backend server for the phonebook application built with Node.js and Express.

## Exercises Completed

### 3.1-3.8: Backend basics
- ✅ 3.1: Return hardcoded phonebook entries from GET /api/persons
- ✅ 3.2: Info page at /info showing count and timestamp
- ✅ 3.3: Get single person by ID (GET /api/persons/:id)
- ✅ 3.4: Delete person (DELETE /api/persons/:id)
- ✅ 3.5: Add new person with POST request
- ✅ 3.6: Validation (required fields, unique names)
- ✅ 3.7: Morgan middleware for logging (tiny configuration)
- ✅ 3.8: Morgan logs POST request body

## Installation

```bash
npm install
```

## Running the Application

### Development mode (with auto-restart):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

### GET /api/persons
Returns all phonebook entries as JSON.

**Example response:**
```json
[
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  }
]
```

### GET /info
Shows the number of entries and current timestamp.

### GET /api/persons/:id
Returns a single person by ID.

**Success (200):**
```json
{
  "id": "1",
  "name": "Arto Hellas",
  "number": "040-123456"
}
```

**Not found (404):**
```json
{
  "error": "person not found"
}
```

### POST /api/persons
Adds a new person to the phonebook.

**Request body:**
```json
{
  "name": "New Person",
  "number": "123-456-7890"
}
```

**Validation errors (400):**
- Missing name: `{ "error": "name is required" }`
- Missing number: `{ "error": "number is required" }`
- Duplicate name: `{ "error": "name must be unique" }`

### DELETE /api/persons/:id
Deletes a person from the phonebook.

**Success:** 204 No Content  
**Not found:** 404 with error message

## Testing

### Using VS Code REST Client
1. Install the "REST Client" extension
2. Open `requests/test.rest`
3. Click "Send Request" above any HTTP request

### Using curl
```bash
# Get all persons
curl http://localhost:3001/api/persons

# Get info
curl http://localhost:3001/info

# Get single person
curl http://localhost:3001/api/persons/1

# Add new person
curl -X POST http://localhost:3001/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","number":"555-1234"}'

# Delete person
curl -X DELETE http://localhost:3001/api/persons/2
```

### Using Browser
- All persons: http://localhost:3001/api/persons
- Info page: http://localhost:3001/info
- Single person: http://localhost:3001/api/persons/1

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Morgan** - HTTP request logger
- **CORS** - Cross-Origin Resource Sharing
- **Nodemon** - Auto-restart during development

## Project Structure

```
phonebook-backend/
├── index.js              # Main server file
├── package.json          # Dependencies and scripts
├── .gitignore           # Git ignore rules
├── requests/
│   └── test.rest        # REST client test file
└── README.md            # This file
```

## Development Notes

- Morgan logs all requests to console
- POST requests show the request body in logs (Exercise 3.8)
- IDs are generated randomly with Math.random()
- Data is stored in memory (resets on server restart)

## Next Steps

- Exercises 3.9-3.11: Connect frontend and deploy
- Exercises 3.12-3.18: Add MongoDB database
- Exercises 3.19-3.22: Validation and ESLint

## License

MIT