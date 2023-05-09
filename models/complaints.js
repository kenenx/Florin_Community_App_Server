const db = require('../database/connect')

class Complaint {
  constructor({ comp_id, title, post_date, content, resolved }) {
    this.comp_id = comp_id
    this.title = title
    this.post_date = post_date
    this.content = content
    this.resolved = resolved
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM complaints ORDER BY comp_id')
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
      throw new Error('Unable to  find the complaints data.')
    }
    return new Complaint(response.rows[0])
  }

  static async create(data) {
    let { title, post_date, content, resolved } = data
    const response = await db.query(
      'INSERT INTO complaints ( title, post_date, content, resolved) VALUES ($1, $2, $3, $4) RETURNING comp_id;',

      [title, post_date, content, resolved]
    )
    const complaintId = response.rows[0].comp_id
    const newSnack = await Complaint.getOneById(complaintId)
    return newSnack
  }

  async update(data) {
    let { title, post_date, content, resolved } = data
    const response = await db.query(
      'UPDATE complaints SET title = $2, post_date = $3, content = $4, resolved = $5 WHERE comp_id = $1 RETURNING *;',
      [this.comp_id, title, post_date, content, resolved]
    )
    if (response.rows.length !== 1) {
      throw new Error('Unable to find the complaints data.')
    }
    const updatedData = response.rows[0]
    return updatedData
  }

  async destroy() {
    const response = await db.query(
      'DELETE FROM complaints WHERE comp_id = $1 RETURNING *;',
      [this.comp_id]
    )
    if (response.rows.length !== 1) {
      throw new Error('Unable to delete complaint data.')
    }
    const deleteData = response.rows[0]
    return new Complaint(deleteData)
  }
}

module.exports = Complaint