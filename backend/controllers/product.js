const asyncHandler = require('express-async-handler')
const Accessory = require('../models/AccessoryModel')
const Tv = require('../models/TvModel')
const Cellphone = require('../models/CellPhoneModel')
const Computer = require('../models/ComputerModel')

const recentProduct = asyncHandler(async (req, res) => {
  const accessories = await Accessory.find({}).sort({ createdAt: -1 })
  const tvs = await Tv.find({}).sort({ createdAt: -1 })
  const cellphones = await Cellphone.find({}).sort({ createdAt: -1 })
  const computers = await Computer.find({}).sort({ createdAt: -1 })

  let recentProducts = {
    accessories: {
      id: accessories[0]._id,
      name: accessories[0].name,
      image: accessories[0].image,
    },
    tvs: { id: tvs[0]._id, name: tvs[0].name, image: tvs[0].image },
    cellphones: {
      id: cellphones[0]._id,
      name: cellphones[0].name,
      image: cellphones[0].image,
    },
    computers: {
      id: computers[0]._id,
      name: computers[0].name,
      image: computers[0].image,
    },
  }

  res.json(recentProducts)
})

module.exports = recentProduct
