const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
	id: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Clients', ClientSchema);