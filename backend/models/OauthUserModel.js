const mongoose = require('mongoose')

const OauthUserSchema = mongoose.Schema({
  oauthId: {
    type: String,
  },
  from: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  image: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const OauthUser = mongoose.model('Oauthuser', OauthUserSchema)

module.exports = OauthUser
