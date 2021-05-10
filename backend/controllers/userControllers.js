const asyncHandler = require('express-async-handler')
const User = require('../models/UserModel')
const generateToken = require('../config/generateToken')

//@Desc Register a User
//@Route POST /api/users
//@Access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, age, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(401)
    throw new Error('Email already exists')
  }

  const newUser = await User.create({
    username,
    email,
    age,
    password,
  })

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      age: newUser.age,
      password: newUser.password,
      token: generateToken(newUser._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@Desc Login user & gt token
//@Route POST /api/users/login
//@Access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      age: user.age,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//@Desc Get All Users
//@Route GET /api/users
//@Access private/admin
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const count = await User.countDocuments({})

  const users = await User.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ users, page, count, pages: Math.ceil(count / pageSize) })
})

//@Desc Get User Profile
//@Route GET /api/users/profile
//@Access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      age: user.age,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

//@Desc Update User
//@Route PUT /api/users/profile
//@Access private
const UpdateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.age = req.body.age || user.age
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      age: updatedUser.age,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

//@Desc Delete Myself
//@Route DELETE /api/users/profile
//@Access private
const DeleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    throw new Error('User not found!')
  }

  await user.remove()

  res.json({ message: 'User Removed' })
})

//@Desc Delete User
//@Route DELETE /api/users/:id
//@Access private, Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({
      message: 'User Removed!',
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

//@Desc Get User By Id
//@Route GET /api/users/:id
//@Access private, Admin
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

//@Desc Update User
//@Route PUT /api/users/:id
//@Access private, Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.age = req.body.age || user.age
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      age: updatedUser.age,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  getUserProfile,
  UpdateUserProfile,
  DeleteUserProfile,
  deleteUser,
  updateUser,
  getUser,
}
