const express = require('express')
const {
  addComputer,
  deleteComputer,
  getComputerById,
  getComputers,
  updateComputer,
} = require('../controllers/computerController')
const { admin, auth } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(auth, admin, addComputer).get(getComputers)
router
  .route('/:id')
  .get(getComputerById)
  .delete(auth, admin, deleteComputer)
  .put(auth, admin, updateComputer)

module.exports = router
