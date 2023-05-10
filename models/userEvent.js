const db = require('../database/connect')

class UserEvent {

    constructor ({ user_event_id, event_id, user_id }) {
        this.user_event_id = user_event_id
        this.event_id = event_id
        this.user_id = user_id
    }

    static async getAll() {
        const response = await db.query(
            "SELECT * FROM userEvents ORDER BY event_id");
        if (response.rows.length === 0) {
            throw new Error("No user events available.")
        }
        return response.rows.map(g => new UserEvent(g));
    }

    static async create(data) {
        let {event_id, user_id } = data   
        const response = await db.query(
            'INSERT INTO userEvents (event_id, user_id) VALUES ($1, $2) RETURNING *;',
         [event_id, user_id]);
        return new UserEvent(response.rows[0]);
    }

    static async getOneById(id) {
        const response = await db.query(
            "SELECT * FROM userEvents WHERE user_event_id = $1;",[id]) 
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user event.")
        }
        return new UserEvent(response.rows[0]);
    }

    async update(data) {
        let {event_id, user_id } = data
        const response = await db.query(
            'UPDATE userEvents SET event_id = $1, user_id = $2 WHERE user_event_id = $3 RETURNING *;' ,
            [this.user_event_id, event_id, user_id]
        ) 
        if (response.rows.length !== 1) {
            throw new Error('Unable to find the user events data.')
        }
        return response.rows[0]
    }



    static async destroy(id) {
        const response = await db.query(
            'DELETE FROM userEvents WHERE user_event_id = $1 RETURNING *;', 
            [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to delete user event.")
        }
        return new UserEvent(response.rows[0]);
    }

}

module.exports = UserEvent;