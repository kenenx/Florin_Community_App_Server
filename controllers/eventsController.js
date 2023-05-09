const Event = require("../models/Event.js");

async function index (req, res) {
    try {
        const events = await Event.getAll();
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const event = await Event.getOneById(id);
        res.status(200).json(event);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updateData = await Event.getOneById(id);
        const result = await updateData.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function create (req, res) {
    try {
        const event = await Event.create(req.body);
        res.status(201).json(event);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}


async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const event = await Event.destroy(id);
        res.status(204).json(event);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = {
    index, show, create, update, destroy
}