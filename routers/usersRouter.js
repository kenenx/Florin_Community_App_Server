const { Router } = require('express');

const usersController = require('../controllers/usersController.js');

const usersRouter = Router();
const profileRouter = Router();
const authenticator = require('../middleware/authenticator.js')

usersRouter.post("/register", usersController.register);
usersRouter.post("/login", usersController.login);

//////////////////////////////
//user profile
profileRouter.get("/bin",authenticator,usersController.binDeets);
//profileRouter.get("/events",usersController.eventDeets);
profileRouter.get("/complaints",authenticator,usersController.showComplaints);
profileRouter.get("/recycling",authenticator,usersController.recyclingPosts);


module.exports = usersRouter, profileRouter;
