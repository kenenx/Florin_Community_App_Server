const { REFUSED } = require('dns')
const db = require('../database/connect')

class Recycle {
  constructor({
    recy_id,
    recy_title,
    recy_type,
    bin_coll,
    post_date,
    img,
    info,
  }) {
    this.recy_id = recy_id
    this.recy_title = recy_title
    ;(this.recy_type = recy_type),
      (this.bin_coll = bin_coll),
      (this.post_date = post_date),
      (this.img = img)
    this.info = info
  }

  static async getAll() {
    const response = await db.query('SELECT * FROM recycling')
    return response.rows.map((r) => new Recycle(r))
  }

  static async getOneById(id) {
    const response = await db.query(
      'SELECT * FROM recycling WHERE recy_id = $1',
      [id]
    )
    if (response.rows.length != 1) {
      throw new Error('Unable to locate item.')
    }
    return new Recycle(response.rows[0])
  }
  async update(data) {
    let { title, info, recy_type, post_date, img } = data
    const response = await db.query(
      'UPDATE recycling SET recy_title = $2, info = $3, recy_type = $4, post_date = $5, img =$6 WHERE recy_id = $1 RETURNING *;',
      [this.recy_id, title, info, recy_type, post_date, img]
    )
    if (response.rows.length != 1) {
      throw new Error('Unable to update item.')
    }
    const updatedData = response.rows[0]
    return updatedData
    // return new Post(response.rows[0]);
  }

  static async create(data) {
    const { recy_title, recy_type, post_date, info, img } = data
    let response = await db.query(
      'INSERT INTO recycling (recy_title,recy_type, post_date, info, img) VALUES ($1, $2, $3, $4, $5) RETURNING*;',
      [recy_title, recy_type, post_date, info, img]
    )
    const newId = response.rows[0].recy_id
    const newRecycle = await Recycle.getOneById(newId)
    return newRecycle
  }

  async destroy() {
    let response = await db.query(
      'DELETE FROM recycling WHERE recy_id = $1 RETURNING *;',
      [this.id]
    )
    return new Recycle(response.rows[0])
  }
}

module.exports = Recycle
