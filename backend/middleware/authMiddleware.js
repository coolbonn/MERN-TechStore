const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const OauthUser = require('../models/OauthUserModel')

const auth = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      req.oauthUser = await OauthUser.findById(decoded.id)

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized, token')
    }
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not Authorized As an Admin!')
  }
}

module.exports = { auth, admin }
