const express = require('express')
const {
  addCellPhones,
  deleteCellPhone,
  getCellPhoneById,
  getCellPhones,
  updateCellPhone,
} = require('../controllers/cellPhoneControllers')
const { admin, auth } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(auth, admin, addCellPhones).get(getCellPhones)
router
  .route('/:id')
  .get(getCellPhoneById)
  .delete(auth, admin, deleteCellPhone)
  .put(auth, admin, updateCellPhone)

module.exports = router
