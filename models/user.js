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
    const response = await db.query("SELECT binColl.bin_coll FROM users, binColl WHERE users.bin_id = binColl.bin_id AND users.user_id = $1",[id]);
    console.log('res',response.rows[0])  //should print the bin collection day. 
    if (response.rows.length != 1) {
      throw new Error("Unable to locate collection day.");
    }
    const binColl = new User(response.rows[0]);
    return binColl
  }
  /////////////////////////////////////////////////////////////////////////////
  //adding complaints 
  static async getComplaintInfo() {
    const response = await db.query("SELECT users.user_name as user_name, complaints.title AS Complaints_title FROM users JOIN complaints ON users.comp_id = complaints.comp_id");
    if (response.rows.length != 1) {
      throw new Error("Unable to locate complaints.");
    }
    return new User(response.rows[0]);
  }
  /////////////////////////////////////////////////////////////////
  // static async getRecyclingPosts() {
  //   const response = await db.query("SELECT users.user_name as user_name, recycling.recy_title AS recycling_post FROM users JOIN recycling ON users.recy_id = recycling.recy_id");
  //   if (response.rows.length != 1) {
  //     throw new Error("Unable to locate complaints.");
  //   }
  //   return new User(response.rows[0]);
  // }
  ////////////////////////////////////////////////////////////////////
  static async getUserfromToken() {
    const userToken = await db.query("SELECT token FROM tokens ORDER BY token_id DESC LIMIT 1")
    const data = userToken.rows[0]
    const response = await db.query("SELECT tokens.user_id FROM users, tokens WHERE users.user_id = tokens.user_id AND tokens.token = $1",
    [data.token]);
    if (response.rows.length != 1) {
      throw new Error("Unable to locate token.");
    }
    return new User(response.rows[0]);
  }

  static async getEventsUser(id) {
    const response = await db.query(
      "SELECT users.user_id, users.user_name, events.* FROM users, events, userevents WHERE users.user_id = userevents.user_id AND events.event_id = userevents.event_id AND users.user_id = $1",
    [id]);
    [console.log(response.rows)]
    if (response.rows.length < 1) {
      throw new Error("Unable to locate user's events.");
    }
    return response.rows;
  }

}

module.exports = User;
