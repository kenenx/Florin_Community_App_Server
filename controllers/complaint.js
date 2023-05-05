const Complaint = require('../models/complaints')

async function index(req, res) {
  try {
    const displayData = await Complaint.getAll()
    res.status(200).json(displayData)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id)
    const complain = await Complaint.getOneById(id)
    res.status(200).json(complain)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

// create new snack
async function create(req, res) {
  try {
    const complaintData = req.body
    const createData = await Complaint.create(complaintData)
    res.status(201).json(createData)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

module.exports = {
  index,
  show,
  create,
  // update,
  // delete
}
