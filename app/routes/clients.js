const express = require('express')
const router = express.Router()
const verifyToken = require('./login')
const jwt = require('jsonwebtoken')
require('dotenv/config')

const Client = require('../models/Client')

// Get client data with a given :type ('id' or 'name')
router.get('/:type/:data', verifyToken.verifyToken, async (req, res) => {
  // Check that :type can only be id or name
  if (req.params.type === 'id' || req.params.type === 'name') {
    // Get data from the JWT
    jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        // In case that in the future another role is created
        if (authData.client.role === 'user' || authData.client.role === 'admin') {
          try {
            var client
            // Find the client in the Database
            if (req.params.type === 'id') { client = await Client.findOne({ id: req.params.data }) } else { client = await Client.findOne({ name: req.params.data }) }
            // If the searched client is found, show it in the response
            if (client) {
              res.json({ client })
            } else {
              res.json({ message: 'Client not found' })
            }
          } catch (err) {
            res.json({ message: err })
          }
        } else {
          res.sendStatus(403)
        }
      }
    })
  } else {
    res.json({ message: 'Invalid URL' })
  }
})

module.exports = router
