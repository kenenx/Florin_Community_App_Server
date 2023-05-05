const bcrypt = require('bcrypt');
const User = require('../models/user');
const Token = require('../models/token');

async function register(req, res) {
  try {
    const data = req.body;

    // Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    // Hash the password
    data["password"] = await bcrypt.hash(data["password"], salt);
    console.log(data)

    const result = await User.create(data);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ "error": err.message })
  }
};

async function login(req, res) {
  try {
    const data = req.body;
    const user = await User.getOneByUsername(data.username);

    // comparing that the password matched the hash
    const authenticated = await bcrypt.compare(data.password, user["password"]);

    if (!authenticated) {
      throw new Error("Incorrect credentials.");
    } else {
      const token = await Token.create(user["id"])
      res.status(200).json({ authenticated: true, token: token.token });
    }

  } catch (err) {
    res.status(403).json({ "error": err.message })
  }
}

module.exports = {
  register, login
}
