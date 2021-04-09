const asyncHandler = require('express-async-handler')
const OauthUser = require('../models/OauthUserModel')
const generateToken = require('../config/generateToken')

//@Desc Register a Oauth User
//@Route POST /api/oauth/users
//@Access Public
const registerOauthUser = asyncHandler(async (req, res) => {
  const { oauthId, from, username, email, image } = req.body

  const newUser = await OauthUser.create({
    oauthId,
    from,
    username,
    email,
    image,
  })

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      oauthId: newUser.oauthId,
      from: newUser.from,
      username: newUser.username,
      email: newUser.email,
      image: newUser.image,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@Desc Logout and Delete Oauth User
//@Route GET /api/oauth/logout
//@Access Private
const logoutOauthUser = asyncHandler(async (req, res) => {
  await OauthUser.findByIdAndRemove(req.oauthUser._id)

  res.json({ message: 'User Removed' })
})

module.exports = { registerOauthUser, logoutOauthUser }
