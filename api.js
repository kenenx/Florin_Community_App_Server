const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const api = express()

api.use(cors());
api.use(express.json());
api.use(morgan('dev'));

const eventsRouter = require('./routers/eventsRouter');
const complaintRouter = require('./routers/complaintRouter')
const userEventsRouter = require('./routers/userEventsRouter')
const recyclingRouter = require('./routers/recycleRouter');
const userRouter = require('./routers/usersRouter');
//const profileRouter = require('./routers/usersRouter');


api.get("/", (req, res) => {
    res.json({
        name: "Community app",
        description: "Welcome."
    })
})

api.use("/users", userRouter);
//api.use("/profile",profileRouter);
api.use("/recycling", recyclingRouter);
api.use("/events", eventsRouter);
api.use("/userevents", userEventsRouter);
api.use('/complaints', complaintRouter);

module.exports = api
