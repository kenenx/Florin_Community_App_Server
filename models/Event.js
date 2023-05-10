const db = require('../database/connect')

class Event {

    constructor ({ event_id, event_title, event_type, event_date, event_content, attendance }) {
        this.id = event_id;
        this.title = event_title;
        this.type = event_type;
        this.date = event_date;
        this.content = event_content;
        this.attendance = attendance;
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM events ORDER BY event_date ");
        if (response.rows.length === 0) {
            throw new Error("No event available.")
        }
        return response.rows.map(g => new Event(g));
    }

    static async create(data) {
        const { event_title,
            event_type,
            event_date,
            event_content} = data   
        const response = await db.query(
            'INSERT INTO events (event_title, event_type, event_date, event_content) VALUES ($1, $2, $3, $4) RETURNING *;', [event_title, event_type, event_date, event_content]);
        return new Event(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM events WHERE event_id = $1;",[id]) ;
        if (response.rows.length != 1) {
            throw new Error("Unable to locate event.")
        }
        return new Event(response.rows[0]);
    }


     async update(data) {
        let { event_title,
            event_type,
            event_date,
            event_content,
            attendance} = data
        const response = await db.query(
            "UPDATE events SET event_title = $2, event_type = $3, event_date = $4, event_content = $5, attendance = $6 WHERE event_id = $1 RETURNING *;",
        [this.id, event_title, event_type, event_date, event_content, attendance]);
        if (response.rows.length !== 1) {
            throw new Error("Unable to update event.")
        }
        return response.rows[0];
    }

    static async destroy(id) {
        const response = await db.query(
            'DELETE FROM events WHERE event_id = $1 RETURNING *;', [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete event.")
        }
        return new Event(response.rows[0]);
    }
}

module.exports = Event;