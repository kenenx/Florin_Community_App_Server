const { Router } = require('express');

const eventsController = require('../controllers/eventsController.js');
const eventsRouter = Router();

eventsRouter.get("/", eventsController.index);
eventsRouter.post("/", eventsController.create);
eventsRouter.get("/:id", eventsController.show);
eventsRouter.patch("/:id", eventsController.update)
eventsRouter.delete("/:id", eventsController.destroy);

module.exports = eventsRouter;

// DB_URL=postgres://fimpwymu:audfwt_xOEKjYgkUWvT-fYjvxabYrY-f@horton.db.elephantsql.com/fimpwymu
// port=8080