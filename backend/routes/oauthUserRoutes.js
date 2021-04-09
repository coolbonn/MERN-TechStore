const express = require('express')
const {
  registerOauthUser,
  logoutOauthUser,
} = require('../controllers/oauthUserControllers')
const { admin, auth } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/users').post(registerOauthUser)
router.route('/logout').delete(auth, logoutOauthUser)

module.exports = router
