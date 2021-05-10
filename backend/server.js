const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const ConnectDB = require('./config/db')
require('colors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()

ConnectDB()

const app = express()

app.use(express.json())

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/oauth', require('./routes/oauthUserRoutes'))
app.use('/api/cellphones', require('./routes/cellPhoneRoutes'))
app.use('/api/tvs', require('./routes/tvRoutes'))
app.use('/api/computers', require('./routes/computerRoutes'))
app.use('/api/accessories', require('./routes/accessoryRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/upload', require('./routes/uploadRoutes'))

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is up and running in ${process.env.NODE_ENV} mode on port ${PORT}`
      .brightMagenta.bold
  )
)
