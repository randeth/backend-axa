const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')

// Import routes
const clientsRoute = require('./app/routes/clients')
const policiesRoute = require('./app/routes/policies')
const loginRoute = require('./app/routes/login')

// Middleware
app.use(express.json())

app.use('/api/clients', clientsRoute)
app.use('/api/policies', policiesRoute)
app.use('/api/login', loginRoute.router)

app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to DB')
    }
  }
)

// Start express server
const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log(`Listening on ${port}`))
module.exports = server
