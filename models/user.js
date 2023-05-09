const db = require('../database/connect');

class User {

  constructor({ id, user_name, password, is_admin }) {
    this.id = id;
    this.username = user_name;
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

  ////////////////////////////////////////////////////////////////////////////
  //user information
  /////////////////////////////////////////////////////////////////////////
  //joining user info with its bin collection days
  static async getbinColl() {
    const response = await db.query("SELECT users.bin_id, binColl.bin_coll FROM users, binColl WHERE users.bin_id = binColl.bin_id");
    //should print the bin collection day. 
    if (response.rows.length != 1) {
      throw new Error("Unable to locate collection day.");
    }
    return new User(response.rows[0]);
  }
  // //adding events to user profile
  // static async getEventInfo() {
  //   const response = await db.query("SELECT users.user_name as user_name, events.event_title AS event_title FROM users JOIN events ON users.event_id = events.event_id");
  //   if (response.rows.length != 1) {
  //     throw new Error("Unable to locate events joined.");
  //   }
  //   return new User(response.rows[0]);
  // }
  //adding complaints 
  static async getComplaintInfo() {
    const response = await db.query("SELECT users.user_name as user_name, complaints.title AS Complaints_title FROM users JOIN complaints ON users.comp_id = complaints.comp_id");
    if (response.rows.length != 1) {
      throw new Error("Unable to locate complaints.");
    }
    return new User(response.rows[0]);
  }
  static async getRecyclingPosts() {
    const response = await db.query("SELECT users.user_name as user_name, recycling.recy_title AS recycling_post FROM users JOIN recycling ON users.recy_id = recycling.recy_id");
    if (response.rows.length != 1) {
      throw new Error("Unable to locate complaints.");
    }
    return new User(response.rows[0]);
  }
}

module.exports = User;
