# Florin_Community_App_Server

## Installation and Usage
- add an .env file with DB_URL= and PORT= to add your own database URL and port
- cd api
- npm install
- npm run setup-db
- npm run dev, app will run on port in .env file or 3000 if none is specified (http://localhost:[3000])

## Deployed on https://florin-api.onrender.com/

## Endpoints
- GET `/events`
- GET `/events/:id`
- POST `/events`
- PATCH `/events/:id`
- DELETE `/events/:id`
