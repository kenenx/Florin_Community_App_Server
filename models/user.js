const db = require('../database/connect');

class User {
  
  constructor({ user_id, user_name, user_email, password, bin_id,is_admin }) {
    this.user_id = user_id;
    this.username = user_name;
    this.user_email = user_email;
    this.password = password;
    this.bin_id = bin_id;
    this.isAdmin = is_admin;
  }

  static async getOneById(id) {
    const response = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
    }
    return new User(response.rows[0]);
  }

  static async getOneByUsername(username) {
    const response = await db.query("SELECT * FROM users WHERE user_name = $1", [username]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate user.");
     
    }
    return new User(response.rows[0]);
  }

  static async create({ username, user_email, password, idAdmin, bin_id }) {
    console.log("model 29", username)
    console.log("model 29", user_email)
    console.log("model 29", password)
    let response = await db.query("INSERT INTO users (user_name, user_email,password, bin_id) VALUES ($1, $2,$3,$4) RETURNING user_id;",
      [username,user_email, password, bin_id]);
    const newId = response.rows[0].user_id;
    const newUser = await User.getOneById(newId);
    return newUser;
  }

  ////////////////////////////////////////////////////////////////////////////
  //user information
  /////////////////////////////////////////////////////////////////////////
  //joining user info with its bin collection days
  static async getbinColl(id) {
    const response = await db.query("SELECT users.bin_id, binColl.bin_coll FROM users, binColl WHERE users.bin_id = binColl.bin_id AND users.user_id = $1",[id]);
    //should print the bin collection day. 
    if (response.rows.length != 1) {
      throw new Error("Unable to locate collection day.");
    }
    return new User(response.rows[0]);
  }
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
