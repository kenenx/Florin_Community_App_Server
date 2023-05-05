const { Router } = require('express');

const authenticator = require("../middleware/authenticator");
const recyclingController = require('../controllers/recycling');

const recyclingRouter = Router();

recyclingRouter.get("/",recyclingController.index);
recyclingRouter.post("/", recyclingController.create);
recyclingRouter.get("/:id", recyclingController.show);
recyclingRouter.patch('/:id',recyclingController.update)
recyclingRouter.delete("/:id", recyclingController.destroy);

module.exports = recyclingRouter;
