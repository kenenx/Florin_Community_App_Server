const { Router } = require('express');

const usersController = require('../controllers/usersController.js');

const usersRouter = Router();
const profileRouter = Router();
const authenticator = require('../middleware/authenticator.js')

usersRouter.post("/register", usersController.register);
usersRouter.post("/login", usersController.login);

//////////////////////////////
//user profile
usersRouter.get("/:id",usersController.show);
usersRouter.get("/:id/bin",authenticator,usersController.binDeets);
//profileRouter.get("/profile/events",usersController.eventDeets);
usersRouter.get("/:id/complaints",authenticator,usersController.showComplaints);
usersRouter.get("/:id/recycling",authenticator,usersController.recyclingPosts);


module.exports = usersRouter;
