const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const usersRouter = require('./routers/usersRouter')
const complaintRouter = require('./routers/complaintRouter')

const api = express()

api.use(cors())
api.use(express.json())
// api.use(logger('dev'))

api.use('/users', usersRouter)

// api.use('/events', eventsRouter)
api.use('/complaints', complaintRouter)

api.get('/', (req, res) => {
  res.json({
    title: 'Snack Rankings',
    description: 'Find and rate the best snacks ever!',
  })
})

module.exports = api
