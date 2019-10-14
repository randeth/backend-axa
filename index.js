const express = require('express');
const app = express();
const mongoose = require('mongoose');
const https = require('http');
require ('dotenv/config');

//Import Client mongoose schema
const Client = require('./app/models/Client');
const Policy = require('./app/models/Policy');

//Import router
const clientsRoute = require('./app/routes/clients')
const policiesRoute = require('./app/routes/policies')

//Middleware
app.use('/api/clients', clientsRoute);
app.use('/api/policies', policiesRoute);


//Connect to MongoDB
mongoose.connect(
	process.env.DB_CONNECTION,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, client) => {
		if(err) {
        	console.log(err)
    	} else {
    	console.log('Connected to DB')
    	}
	}
);

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on ${port}`))