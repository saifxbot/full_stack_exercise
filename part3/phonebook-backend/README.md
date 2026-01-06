# Phonebook Backend

Backend server for the Full Stack Open Part 3 phonebook application.

## Exercises 3.1-3.8

This implementation includes:

- ✅ **3.1**: GET /api/persons - Returns all phonebook entries
- ✅ **3.2**: GET /info - Shows phonebook info and timestamp
- ✅ **3.3**: GET /api/persons/:id - Returns single person
- ✅ **3.4**: DELETE /api/persons/:id - Deletes a person
- ✅ **3.5**: POST /api/persons - Adds new person with random ID
- ✅ **3.6**: Validation for name/number and unique names
- ✅ **3.7**: Morgan logging middleware (tiny configuration)
- ✅ **3.8**: Morgan custom token to log POST request body

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

## Testing the API

### Using VS Code REST Client

Open the `requests/test.rest` file and click "Send Request" above each request.

### Using Browser

- Get all persons: http://localhost:3001/api/persons
- Get info: http://localhost:3001/info
- Get single person: http://localhost:3001/api/persons/1

### Using curl

```bash
# Get all persons
curl http://localhost:3001/api/persons

# Get single person
curl http://localhost:3001/api/persons/1

# Add new person
curl -X POST http://localhost:3001/api/persons \
  -H "Content-Type: application/json" \
  -d '{"name":"New Person","number":"123-456-7890"}'

# Delete person
curl -X DELETE http://localhost:3001/api/persons/1
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/persons | Get all persons |
| GET | /info | Get phonebook info |
| GET | /api/persons/:id | Get single person |
| POST | /api/persons | Add new person |
| DELETE | /api/persons/:id | Delete person |

## Validation Rules

- Name is required
- Number is required
- Name must be unique

## Dependencies

- **express**: Web framework
- **cors**: Enable Cross-Origin Resource Sharing
- **morgan**: HTTP request logger

## Dev Dependencies

- **nodemon**: Auto-restart server on file changes

## Technologies

- Node.js
- Express.js
- Morgan (logging)
- CORS