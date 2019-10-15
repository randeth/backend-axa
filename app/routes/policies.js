const express = require('express')
const router = express.Router()
const verifyToken = require('./login')
const jwt = require('jsonwebtoken')
require('dotenv/config')

// Import Client and Policy mongoose schema
const Client = require('../models/Client')
const Policy = require('../models/Policy')

// Get the list of policies linked to a user name
router.get('/client/:clientName', verifyToken.verifyToken, async (req, res) => {
  // Get data from the JWT
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      // Only 'admin' can get the data
      if (authData.client.role === 'admin') {
        try {
          // Find the clients in the Database (there could be more than one with the same name)
          const clients = await Client.find({ name: req.params.clientName })
          var policiesArray = []

          // For each client, find it's policies assigned
          for (const client of clients) {
            const policies = await Policy.find({ clientId: client.id })
            policiesArray.push(policies)
          }

          // If the searched client is found, show it in the response
          if (clients.length > 0) {
            res.json({ clients, policies: policiesArray })
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
})

// Get the user linked to a policy number
router.get('/:policyId', verifyToken.verifyToken, async (req, res) => {
  // Get data from the JWT
  jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      // Only 'admin' can get the data
      if (authData.client.role === 'admin') {
        try {
          // Find the given policy id
          const policy = await Policy.findOne({ id: req.params.policyId })
          if (policy) {
            // If the policy is found search for the assigned client
            const client = await Client.findOne({ id: policy.clientId })
            if (client) {
              // if a client is found, returrn it as a response
              res.json(client)
            } else {
              res.json({ message: `Client linked to policy ${req.params.policyId} not found` })
            }
          } else {
            res.json({ message: `Policy ${req.params.policyId} not found` })
          }
        } catch (err) {
          res.json({ message: err })
        }
      } else {
        res.sendStatus(403)
      }
    }
  })
})

module.exports = router
