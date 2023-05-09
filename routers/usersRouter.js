const { Router } = require('express');

const usersController = require('../controllers/usersController.js');

const usersRouter = Router();
const profileRouter = Router();

usersRouter.post("/register", usersController.register);
usersRouter.post("/login", usersController.login);

//////////////////////////////
//user profile
profileRouter.get("/bin",usersController.binDeets);
//profileRouter.get("/events",usersController.eventDeets);
profileRouter.get("/complaints", usersController.showComplaints);
profileRouter.get("/recycling",usersController.recyclingPosts);


module.exports = usersRouter,profileRouter;
