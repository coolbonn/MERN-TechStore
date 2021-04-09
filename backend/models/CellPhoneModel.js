const mongoose = require('mongoose')

const cellPhoneSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    specs: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    altImage1: {
      type: String,
    },
    altImage2: {
      type: String,
    },
    altImage3: {
      type: String,
    },
    altImage4: {
      type: String,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const CellPhone = mongoose.model('Cellphone', cellPhoneSchema)

module.exports = CellPhone
