const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv/config')

// Import Client mongoose schema
const Client = require('../models/Client')

// Login with the client EMAIL
router.post('/', async (req, res) => {
  try {
    // Find the client with the body email
    const client = await Client.findOne({ email: req.body.email })
    // If the client exists, create and return a JWT with all the client's info
    if (client) {
      jwt.sign({ client: client }, process.env.SECRET_KEY, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          res.sendStatus(403)
        } else {
          res.json({
            token
          })
        }
      })
    } else {
      res.json({ message: 'Email not found' })
    }
  } catch (err) {
    res.json({ messages: err })
  }
})

// Check if the token provided on the header is valid
function verifyToken (req, res, next) {
  const bearerHeader = req.headers.authorization
  if (bearerHeader !== undefined) {
    req.token = bearerHeader.split(' ')[1]
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = {
  router: router,
  verifyToken: verifyToken
}
