const express = require('express');
const router = express.Router();
const verifyToken = require('./login')
const jwt = require('jsonwebtoken');
require ('dotenv/config');

router.get('/', verifyToken.verifyToken, (req, res) => {
	jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
		if(err)
			res.sendStatus(403);
		else{
			res.json({
				authData
			})
		}
	})
});

module.exports = router;