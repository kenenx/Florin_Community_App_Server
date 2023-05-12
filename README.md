# Florin_Community_App_Server

## Installation and Usage
- add an `.env` file with DB_URL= and PORT= to add your own database URL (e.g a ElephantSQL instance) and port
   - DB_URL like so `postgres://username:password@horton.db.elephantsql.com/instance`
- `npm install`
- `npm run setup-db`
- `npm run dev`, app will run on port in `.env` file or 3000 if none is specified (http://localhost:[3000])

## Deployed on https://florin-api.onrender.com/

## Endpoints
| ### Events         | ### Complaints            | ### Recycling           |### User                             | ### User Events          |         
| ------------------ | ------------------------- | ----------------------- | ----------------------------------- | ------------------------ |
| GET `/events`      | GET `/complaints`         | GET `/recycling`        | POST `/users/register`              |  GET `/userevents`       |
| GET `/events/:id`  | GET `/complaints/:id`     | GET `/recycling/:id`    | POST `/users/login`                 |  GET `/userevents/:id`   |    
| POST `/events`     | POST `/complaints`        | POST `/recycling`       | GET `/users/profile`                | POST `/userevents`       |
|PATCH `/events/:id` | PATCH `/complaints/:id`   | PATCH `/recycling/:id`  | GET `/users/profile/:id`            | PATCH `/userevents/:id`  |
|DELETE `/events/:id`| DELETE `/complaints/:id`  | DELETE `/recycling/:id` | GET `/users/profile/:id/bin`        | DELETE `/userevents/:id` |
|                    |                           |                         | GET `/users/profile/:id/complaints` |                          |
|                    |                           |                         |  GET `/users/events/:id`            |                          | 

userEventsRouter.post("/", userEventsController.create);
// userEventsRouter.patch('/:id', userEventsController.update)
userEventsRouter.delete("/:id", userEventsController.destroy)

## testing server side
### set up
- run `npm run init`
- run `npm run install`
- make sure you have a `.env` with the db_url 
- make sure there is data stored in the database before testing
### to run
- use `npm run test`
- or `npm run coverage`
