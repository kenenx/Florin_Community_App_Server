const { Router } = require('express');

const usersController = require('../controllers/usersController.js');

const usersRouter = Router();

usersRouter.post("/register", usersController.register);
usersRouter.post("/login", usersController.login);

module.exports = usersRouter;
