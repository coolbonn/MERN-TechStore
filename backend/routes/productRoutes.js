const express = require('express')
const recentProduct = require('../controllers/product')

const router = express.Router()

router.route('/recent').get(recentProduct)

module.exports = router
