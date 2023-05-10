const Recycle = require('../models/recycling')

async function index(req, res) {
  try {
    const recycling = await Recycle.getAll()
    res.status(200).json(recycling)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

async function update(req, res) {
  try {
    const id = parseInt(req.params.id)
    const data = req.body
    const updateData = await Recycle.getOneById(id)
    const result = await updateData.update(data)
    //const result = await Recycle.update(data);
    res.status(200).json(result)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function create(req, res) {
  try {
    const data = req.body
    const result = await Recycle.create(data)
    res.status(201).send(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function show(req, res) {
  try {
    const id = parseInt(req.params.id)
    const recycle = await Recycle.getOneById(id)
    res.json(recycle)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function destroy(req, res) {
  try {
    const id = parseInt(req.params.id)
    const recycling = await Recycle.getOneById(id)
    const result = await recycling.destroy()
    res.status(204).end()
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

module.exports = {
  index,
  update,
  create,
  show,
  destroy,
}
