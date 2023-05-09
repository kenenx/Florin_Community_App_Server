const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const usersRouter = require('./routers/usersRouter');
const eventsRouter = require('./routers/eventsRouter');

const api = express();

api.use(cors());
api.use(express.json());
api.use(morgan('dev'));

api.use("/users", usersRouter);
api.use("/events", eventsRouter);


module.exports = api;