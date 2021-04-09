const express = require('express')
const { auth, admin } = require('../middleware/authMiddleware')
const {
  addOrderItems,
  deleteOrderById,
  getMyOrderList,
  getMyoauthUserOrderList,
  getOrderItems,
  getOrderList,
  updateOrderToDelivered,
  updateOrderToPaid,
} = require('../controllers/orderControllers')

const router = express.Router()

router.route('/').post(auth, addOrderItems).get(auth, admin, getOrderList)
router.route('/myorders').get(auth, getMyOrderList)
router.route('/myoauthuserorders').get(auth, getMyoauthUserOrderList)
router.route('/:id').get(auth, getOrderItems).delete(auth, deleteOrderById)
router.route('/:id/pay').put(auth, updateOrderToPaid)
router.route('/:id/deliver').put(auth, admin, updateOrderToDelivered)

module.exports = router
