const mongoose = require('mongoose')

const PolicySchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  amountInsured: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  inceptionDate: {
    type: Date,
    required: true
  },
  installmentPayment: {
    type: Boolean,
    required: true
  },
  clientId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Policies', PolicySchema)
