const bcrypt = require('bcrypt')
const User = require('../models/user')
const Token = require('../models/token')
const Complaints = require('../models/complaints')

async function show(req, res) {
  try {
    const id = parseInt(req.params.user_id)
    const profile = await User.getOneById(id)
    res.json(profile)
  } catch (err) {
    return res.status(404).json({ error: err.message })
  }
}

async function register(req, res) {
  try {
    const data = req.body

    // Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))

    // Hash the password
    data['password'] = await bcrypt.hash(data['password'], salt)
    console.log(data)

    const result = await User.create(data)

    res.status(201).send(result)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

async function login(req, res) {
  try {
    const data = req.body
    const user = await User.getOneByUsername(data.username)

    // comparing that the password matched the hash
    const authenticated = await bcrypt.compare(data.password, user['password'])

    if (!authenticated) {
      throw new Error('Incorrect credentials.')
    } else {
      const token = await Token.create(user['user_id'])
      res.status(200).json({ authenticated: true, token: token.token })
    }
  } catch (err) {
    res.status(403).json({ error: err.message })
  }
}

///////////////////////////////////////////////////////////////////////
//user profile
///////////////////////////////////////////////////////////////////
async function binDeets(req, res) {
  try {
    const id = parseInt(req.params.user_id)
    console.log('id', id)
    const userbin = await User.getbinColl(id)
    console.log('binnnn', userbin)
    res.json(userbin)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

// async function eventDeets (req, res) {
//   try {
//       const userEvents = await User.getEventInfo();
//       res.json(userEvents);
//   } catch (err) {
//       res.status(500).json({"error": err.message})
//   }
// };
async function showComplaints(req, res) {
  try {
    const id = parseInt(req.params.user_id)
    const compposts = await Complaints.getComplaintInfo(id)
    res.json(compposts)
    console.log(compposts)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function recyclingPosts(req, res) {
  try {
    //const id = parseInt(req.params.id);
    const recyclepost = await User.getRecyclingPosts()
    res.json(recyclepost)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function showToken(req, res) {
  try {
    const userToken = await User.getUserfromToken()
    res.json(userToken)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

async function showEventsUser(req, res) {
  try {
    const id = parseInt(req.params.user_id)
    const userEvents = await User.getEventsUser(id)
    res.json(userEvents)
  } catch (err) {
    res.status(404).json({ error: err.message })
  }
}

module.exports = {
  register,
  login,
  binDeets,
  showComplaints,
  recyclingPosts,
  show,
  showToken,
  showEventsUser,
}
