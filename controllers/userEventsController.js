const UserEvent = require("../models/userEvent.js");

async function index (req, res) {
    try {
        const userEvents = await UserEvent.getAll();
        res.status(200).json(userEvents);
    } catch (err) {
        res.status(500).json({"error": err.message})
    }
}

async function show (req, res) {
    try {
        const id = parseInt(req.params.id);
        const userEvent = await UserEvent.getOneById(id);
        res.status(200).json(userEvent);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

async function create (req, res) {
    try {
        const userEvent = await UserEvent.create(req.body);
        res.status(201).json(userEvent);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}


async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const userEvent = await UserEvent.destroy(id);
        res.status(204).json(userEvent);
    } catch (err) {
        res.status(404).json({"error": err.message})
    }
}

module.exports = {
    index, show, create, destroy
}