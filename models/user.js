const db = require('../database/connect');

class User {

  constructor({ id, username, password, is_admin }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.isAdmin = is_admin;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async create({ username, password, idAdmin }) {
    console.log("model 29", username)
    console.log("model 29", password)
    let response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id;",
      [username, password]);
    const newId = response.rows[0].id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }
}

module.exports = User;
