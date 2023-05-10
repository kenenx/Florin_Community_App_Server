const { Router } = require('express');

const usersController = require('../controllers/usersController.js');

const usersRouter = Router();
const profileRouter = Router();
const authenticator = require('../middleware/authenticator.js')

usersRouter.post("/register", usersController.register);
usersRouter.post("/login", usersController.login);

//////////////////////////////
//user profile
usersRouter.get("/complaints",authenticator,usersController.showComplaints);
usersRouter.get("/profile/:user_id/bin",usersController.binDeets);
usersRouter.get("/profile/:user_id",usersController.show);

//profileRouter.get("/profile/events",usersController.eventDeets);
//usersRouter.get("/recycling",authenticator,usersController.recyclingPosts);


module.exports = usersRouter;
