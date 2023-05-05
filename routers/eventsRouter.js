const { Router } = require('express');

const eventsController = require('../controllers/snacks.js');
const eventsRouter = Router();

eventsRouter.get("/", eventsController.index);
eventsRouter.get("/:id", eventsController.show);
eventsRouter.post("/", eventsController.create);
eventsRouter.patch("/:id", eventsController.update);
eventsRouter.delete("/:id", eventsController.destroy);

module.exports = eventsRouter;