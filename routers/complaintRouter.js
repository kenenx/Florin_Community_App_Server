const { Router } = require('express')

const complaintsController = require('../controllers/complaint')
const complaintRouter = Router()

complaintRouter.get('/', complaintsController.index)
complaintRouter.get('/:id', complaintsController.show)
complaintRouter.post('/', complaintsController.create)
complaintRouter.patch('/:id', complaintsController.update)
complaintRouter.delete('/:id', complaintsController.destroy)

module.exports = complaintRouter
