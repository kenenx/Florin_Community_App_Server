const express = require('express');
const cors = require('cors');
//const logger = require('morgan')

const api = express();
//const logRoutes = require('./middleware/logger');
const recyclingRouter = require('./routers/recycleRouter');
const userRouter = require('./routers/usersRouter');
const profileRouter = require('./routers/usersRouter');

api.use(cors());
api.use(express.json());
//api.listen(logger('dev'))

api.get("/", (req, res) => {
    res.json({
        name: "Community app",
        description: "Welcome."
    })
})

api.use("/users", userRouter);
api.use("/profile",profileRouter);
api.use("/recycling", recyclingRouter);

module.exports = api;
