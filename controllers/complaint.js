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

async function create(req, res) {
  try {
    const complaintData = req.body
    const createData = await Complaint.create(complaintData)
    res.status(201).json(createData)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function update(req, res) {
  try {
    const id = parseInt(req.params.id)
    const data = req.body
    const updateData = await Complaint.getOneById(id)
    const result = await updateData.update(data)
    res.status(200).json(result)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}
async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id)
    const deleteData = await Complaint.getOneById(id)
    await deleteData.destroy()
    res.status(204).json()
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
}
