const express = require('express')
const {
  deleteUser,
  getUser,
  getUserProfile,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
  UpdateUserProfile,
  DeleteUserProfile,
} = require('../controllers/userControllers')
const { auth, admin } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerUser).get(auth, admin, getUsers)
router.route('/login').post(loginUser)
router
  .route('/profile')
  .get(auth, getUserProfile)
  .put(auth, UpdateUserProfile)
  .delete(auth, DeleteUserProfile)
router
  .route('/:id')
  .delete(auth, admin, deleteUser)
  .get(auth, admin, getUser)
  .put(auth, admin, updateUser)

module.exports = router
