const asyncHandler = require('express-async-handler')
const Order = require('../models/OrderModel')

// @desc Create new order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  console.log(req.oauthUser)

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: {
        id: req.user ? req.user._id : null,
        username: req.user ? req.user.username : '',
        email: req.user ? req.user.email : '',
      },
      oauthUser: {
        id: req.oauthUser ? req.oauthUser.oauthId : null,
        username: req.oauthUser ? req.oauthUser.username : '',
        email: req.oauthUser ? req.oauthUser.email : '',
      },
      shippingAddress,
      paymentMethod,
      taxPrice,
      itemsPrice,
      shippingPrice,
      totalPrice,
    })

    const createOrder = await order.save()

    res.status(201).json(createOrder)
  }
})

// @desc Get Order By Id
// @route GET /api/orders/:id
// @access Private
const getOrderItems = asyncHandler(async (req, res) => {
  const orderItems = await Order.findById(req.params.id)
    .populate('user', 'username email')
    .populate('oauthUser', 'username email')

  if (orderItems) {
    res.json(orderItems)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})

// @desc Update Order to Paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    ;(order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      })

    const updateOrder = await order.save()

    res.json(updateOrder)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})

// @desc Update Order to Delivered
// @route PUT /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updateOrder = await order.save()

    res.json(updateOrder)
  } else {
    res.status(404)
    throw new Error('Order Not Found')
  }
})

// @desc Get My Order List
// @route GET /api/orders/myOrders
// @access Private
const getMyOrderList = asyncHandler(async (req, res) => {
  const user = await Order.find({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  })

  res.json(user)
})

// @desc Get My oauthUserOrder List
// @route GET /api/orders/myoauthUserOrders
// @access Private
const getMyoauthUserOrderList = asyncHandler(async (req, res) => {
  const oauthUser = await Order.find({
    oauthUser: {
      id: req.oauthUser.oauthId,
      username: req.oauthUser.username,
      email: req.oauthUser.email,
    },
  })

  res.json(oauthUser)
})

// @desc Get All Orders List
// @route GET /api/orders
// @access Private/Admin
const getOrderList = asyncHandler(async (req, res) => {
  const order = await Order.find({})

  res.json(order)
})

// @desc Delete Order By Id
// @route DELETE /api/orders/:id
// @access Private/Admin
const deleteOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    await order.remove()
    res.json({ message: 'Order Deleted' })
  } else {
    res.status(404)
    throw new Error('Order Not Found!')
  }
})

module.exports = {
  addOrderItems,
  getOrderItems,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrderList,
  getOrderList,
  deleteOrderById,
  getMyoauthUserOrderList,
}
