const db = require('../database/connect')

class UserEvent {

    constructor ({ user_event_id, event_id }) {
        this.id = user_event_id;
        this.event = event_id;
    }

    static async getAll() {
        const response = await db.query("SELECT * FROM userEvents");
        if (response.rows.length === 0) {
            throw new Error("No user events available.")
        }
        return response.rows.map(g => new UserEvent(g));
    }

    static async create(data) {
        const { event_id} = data   
        const response = await db.query('INSERT INTO userEvents (event_id) VALUES ($1) RETURNING *;', [event_id]);
        return new UserEvent(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM userEvents WHERE user_event_id = $1;",[id]) 
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user event.")
        }
        return new UserEvent(response.rows[0]);
    }

    static async destroy(id) {
        const response = await db.query('DELETE FROM userEvents WHERE user_event_id = $1 RETURNING *;', [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete user event.")
        }
        return new UserEvent(response.rows[0]);
    }

}

module.exports = UserEvent;