# Florin_Community_App_Server

## Installation and Usage
- add an `.env` file with DB_URL= and PORT= to add your own database URL (e.g a ElephantSQL instance) and port
   - DB_URL like so `postgres://username:password@horton.db.elephantsql.com/instance`
- `npm install`
- `npm run setup-db`
- `npm run dev`, app will run on port in `.env` file or 3000 if none is specified (http://localhost:[3000])

## Deployed on https://florin-api.onrender.com/

## Endpoints
- GET `/events`
- GET `/events/:id`
- POST `/events`
- PATCH `/events/:id`
- DELETE `/events/:id`

## testing server side
### set up
- run npm init
- run npm install
- make sure you have a `.env` with the db_url 
- make sure there is data stored in the database before testing
