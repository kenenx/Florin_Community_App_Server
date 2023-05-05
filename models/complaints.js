const db = require('../database/connect')

class Complaint {
  constructor({ comp_id, title, post_date, post_date, resolved }) {
    this.comp_id = comp_id
    this.title = title
    this.post_date = post_date
    this.resolved = resolved
  }

  static async getAll() {
    if (response.rows.length === 0) {
      throw new Error('No complaints available.')
    }
    return response.rows.map((el) => new Complaint(el))
  }

  static async getOneById(id) {
    const response = await db.query(
      'SELECT * FROM complaints WHERE comp_id = $1;',
      [id]
    )
    if (response.rows.length !== 1) {
      throw new Error('Unable to locate complaints.')
    }
    return new Snack(response.rows[0])
  }

  static async create(data) {
    let {
      snack_name,
      snack_description,
      healthy = false,
      vegetarian = false,
      votes,
    } = data
    const response = await db.query(
      'INSERT INTO snack (snack_name, snack_description, healthy, vegetarian, votes) VALUES ($1, $2, $3, $4, $5) RETURNING snack_id;',
      // add votes
      [
        snack_name,
        snack_description,
        (healthy = false),
        (vegetarian = false),
        votes,
      ]
    )
    const snackId = response.rows[0].snack_id
    const newSnack = await Snack.getOneById(snackId)
    return newSnack
  }
}

module.exports = Complaint
