# Countries Info Backend 🌍

Backend for the **Countries Info** React application.

The server retrieves country data from external APIs and provides a simplified REST API for the frontend. The data provided by the server includes a list of countries available for viewing and, for each of them, a list of neighboring countries, the country's flag, and population dynamics.

## Frontend

Frontend repository:

https://github.com/AlexandrChek/Countries-Info

Live demo:

https://alexandrchek.github.io/Countries-Info/

## Features

- Provide a sorted list of countries
- Retrieve neighboring countries
- Retrieve country flag
- Retrieve historical population data
- In the list of neighboring countries, each country name is a link to information about it
- Combine data from two external APIs, fixing mismatches between them
- Handle missing data

## Technologies

- Node.js
- Express
- node-fetch
- CORS
- Prettier (for development)

## Installation

Clone the repository:

```bash
git clone https://github.com/AlexandrChek/Countries-Info-BE.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run startDev
```

Start the production server:

```bash
npm start
```

## API Endpoints

| Method | Endpoint            | Description                                                                  |
| ------ | ------------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/countries`    | Returns the list of available countries                                      |
| POST   | `/api/country-info` | Returns the flag, neighboring countries and population history for a country |

## Deployment

The backend is deployed on Vercel.
