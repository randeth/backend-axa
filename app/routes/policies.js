const express = require('express');
const router = express.Router();
const verifyToken = require('./login')
const jwt = require('jsonwebtoken');
require ('dotenv/config');

const Client = require('../models/Client');
const Policy = require('../models/Policy');

//Get the user linked to a policy number
router.get('/:policyId', verifyToken.verifyToken, async (req, res) => {
		//Get data from the JWT
		jwt.verify(req.token, process.env.SECRET_KEY, async (err, authData) => {
			if(err) {
				res.sendStatus(403);
			} else {
				//Only 'admin' can get the data
				if(authData.client.role === 'admin') {
					try {
						//Find the given policy id
						const policy = await Policy.findOne({id: req.params.policyId});
						if(policy){
							//If the policy is found search for the assigned client
							const client = await Client.findOne({id: policy.clientId});
							if(client){
								//if a client is found, returrn it as a response
								res.json(client);

							} else {
								res.json({message: `Client linked to policy ${req.params.policyId} not found`})
							}
						} else {
							res.json({message: `Policy ${req.params.policyId} not found`})
						}

						} catch (err) {
						res.json({message: err});
					}
				} else {
					res.sendStatus(403)
				}
			}
		});
	

});


module.exports = router;