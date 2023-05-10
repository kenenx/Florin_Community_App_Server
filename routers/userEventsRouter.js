const { Router } = require('express');

const userEventsController = require('../controllers/userEventsController.js');
const userEventsRouter = Router();

userEventsRouter.get("/", userEventsController.index);
userEventsRouter.post("/", userEventsController.create);
userEventsRouter.get("/:id", userEventsController.show);
// userEventsRouter.patch('/:id', userEventsController.update)
userEventsRouter.delete("/:id", userEventsController.destroy);

module.exports = userEventsRouter;