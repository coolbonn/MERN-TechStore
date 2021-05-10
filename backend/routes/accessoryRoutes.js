const express = require('express')
const {
  addAccessory,
  deleteAccessory,
  getAccessoryById,
  getAccessories,
  updateAccessory,
} = require('../controllers/accessoryControllers')
const { admin, auth } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(auth, admin, addAccessory).get(getAccessories)
router
  .route('/:id')
  .get(getAccessoryById)
  .delete(auth, admin, deleteAccessory)
  .put(auth, admin, updateAccessory)

module.exports = router
