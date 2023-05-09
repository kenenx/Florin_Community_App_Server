const { Router } = require('express')

const complaintsController = require('../controllers/complaint')
const complaintRouter = Router()

complaintRouter.get('/', complaintsController.index)
complaintRouter.get('/:id', complaintsController.show)
complaintRouter.post('/', complaintsController.create)
complaintRouter.patch('/:id', complaintsController.update)
complaintRouter.delete('/:id', complaintsController.destroy)

module.exports = complaintRouter

// PORT = 3000
// DB_URL = postgres://cdubcgev:nR1HxqbvmdFJ9Sy4AZy_elA0NufwuHNm@horton.db.elephantsql.com/cdubcgev