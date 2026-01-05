# Phonebook Application

A full-stack phonebook application built with React and JSON Server. This project implements exercises 2.6-2.17 from the Full Stack Open course.

## Features

- ✅ Add new persons with name and phone number
- ✅ Search/filter persons by name
- ✅ Update existing person's phone number
- ✅ Delete persons from the phonebook
- ✅ Fetch data from JSON server
- ✅ Success and error notifications
- ✅ Error handling for network requests
- ✅ Duplicate name detection with update confirmation

## Installation

```bash
npm install
```

## Running the Application

You need to run two commands in separate terminals:

1. Start the JSON server (backend):
```bash
npm run server
```

2. Start the development server (frontend):
```bash
npm run dev
```

The application will be available at `http://localhost:5173`
The JSON server will run at `http://localhost:3001`

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **JSON Server** - Mock REST API backend

## Project Structure

```
phonebook/
├── src/
│   ├── components/
│   │   ├── Filter.jsx          # Search filter component
│   │   ├── PersonForm.jsx      # Form for adding persons
│   │   ├── Persons.jsx         # List of persons display
│   │   └── Notification.jsx    # Notification messages
│   ├── services/
│   │   └── persons.js          # API service module
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Styles
├── db.json                    # JSON server database
├── index.html                 # HTML template
├── package.json              # Dependencies and scripts
└── vite.config.js           # Vite configuration
```

## API Endpoints

The JSON server provides the following REST API endpoints:

- `GET /persons` - Get all persons
- `POST /persons` - Create a new person
- `PUT /persons/:id` - Update a person
- `DELETE /persons/:id` - Delete a person

## Exercises Implemented

- **2.6-2.10**: Phonebook step 1-5 (basic functionality, filtering)
- **2.11**: Phonebook step 6 (data fetching)
- **2.12-2.14**: Phonebook step 7-9 (backend communication)
- **2.15-2.17**: Phonebook step 10-12 (updating, deleting, notifications)

## License

MIT