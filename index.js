const express = require('express');
const app = express();
const mongoose = require('mongoose');
require ('dotenv/config');

//Import router
const clientsRoute = require('./routes/clients')

app.use('/api/clients', clientsRoute);
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('Connected to DB')
);
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}`))