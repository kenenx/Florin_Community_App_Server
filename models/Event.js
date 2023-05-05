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
        const response = await db.query("SELECT * FROM events ORDER BY event_date ");
        if (response.rows.length === 0) {
            throw new Error("No event available.")
        }
        return response.rows.map(g => new Snack(g));
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM events WHERE event_id = $1;",[id]) ;
        if (response.rows.length != 1) {
            throw new Error("Unable to locate event.")
        }
        return new Snack(response.rows[0]);
    }

    static async create(data) {
        const { event_title,
            event_type,
            event_date,
            event_content,
            attendance} = data   
        const response = await db.query('INSERT INTO events (event_title, event_type, event_date, event_content, attendance ) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [event_title, event_type, event_date, event_content, attendance]);
        // const snackId = response.rows[0].snack_id;
        // const newSnack = await Snack.getOneById(snackId);
        return new Event(response.rows[0]);
    }

    static async update(id) {
        const response = await db.query("UPDATE snack SET votes = votes + 1 WHERE snack_id = $1 RETURNING snack_id,snack_name, votes;",
            [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to update votes.")
        }
        return new Snack(response.rows[0]);
    }

    static async destroy(id) {
        const response = await db.query('DELETE FROM snack WHERE snack_id = $1 RETURNING *;', [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete snack.")
        }
        return new Snack(response.rows[0]);
    }
}

module.exports = Snack;