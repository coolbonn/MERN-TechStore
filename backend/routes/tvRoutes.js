const express = require('express')
const {
  addTv,
  deleteTv,
  getTvById,
  getTvs,
  updateTv,
} = require('../controllers/tvControllers')
const { admin, auth } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(auth, admin, addTv).get(getTvs)
router
  .route('/:id')
  .get(getTvById)
  .delete(auth, admin, deleteTv)
  .put(auth, admin, updateTv)

module.exports = router
