const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const api = express()

api.use(cors());
api.use(express.json());
api.use(morgan('dev'));

const eventsRouter = require('./routers/eventsRouter');
const usersRouter = require('./routers/usersRouter')
const complaintRouter = require('./routers/complaintRouter')
const userEventsRouter = require('./routers/userEventsRouter')


api.use("/users", usersRouter);
api.use("/events", eventsRouter);
api.use("/userevents", userEventsRouter);
api.use('/complaints', complaintRouter);

module.exports = api
