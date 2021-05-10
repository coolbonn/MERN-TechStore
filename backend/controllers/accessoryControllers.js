const fs = require('fs')
const asyncHandler = require('express-async-handler')
const Accessory = require('../models/AccessoryModel')

//@Desc Add new Accessory
//@Route POST /api/accessories
//@Access Private/Admin
const addAccessory = asyncHandler(async (req, res) => {
  const accessory = new Accessory({
    name: req.body.name,
    brand: req.body.brand,
    specs: req.body.specs,
    year: req.body.year,
    price: req.body.price,
    image: req.body.image,
    altImage1: req.body.altImage1 || '',
    altImage2: req.body.altImage2 || '',
    altImage3: req.body.altImage3 || '',
    altImage4: req.body.altImage4 || '',
    countInStock: req.body.countInStock,
    user: req.user._id,
  })

  const addAccessory = await accessory.save()
  res.status(201).json(addAccessory)
})

//@Desc Get All Accessories
//@Route GET /api/accessories
//@Access Public
const getAccessories = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const sortBy = req.query.sortBy
  const brandName = req.query.brand
    ? {
        brand: {
          $regex: req.query.brand,
          $options: 'i',
        },
      }
    : {}

  const keyword = req.query.search
    ? {
        name: {
          $regex: req.query.search,
          $options: 'i',
        },
      }
    : {}

  const count = await Accessory.countDocuments({ ...brandName, ...keyword })

  const accessories =
    sortBy === 'yearasc'
      ? await Accessory.find({})
          .sort({ year: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'yeardesc'
      ? await Accessory.find({})
          .sort({ year: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'priceasc'
      ? await Accessory.find({})
          .sort({ price: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'pricedesc'
      ? await Accessory.find({})
          .sort({ price: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'oldest'
      ? await Accessory.find({})
          .sort({ createdAt: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : await Accessory.find({ ...brandName, ...keyword })
          .sort({ createdAt: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

  res.json({ accessories, count, page, pages: Math.ceil(count / pageSize) })
})

//@Desc Get Accesory By Id
//@Route GET /api/accessories/:id
//@Access Public
const getAccessoryById = asyncHandler(async (req, res) => {
  const accessory = await Accessory.findById(req.params.id)

  if (accessory) {
    res.json(accessory)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//@Desc Delete Accessory By Id
//@Route DELETE /api/accessories/:id
//@Access Private/Admin
const deleteAccessory = asyncHandler(async (req, res) => {
  const accessory = await Accessory.findById(req.params.id)

  if (accessory) {
    const path = `./${accessory.image}`
    const path1 = `./${accessory.altImage1}`
    const path2 = `./${accessory.altImage2}`
    const path3 = `./${accessory.altImage3}`
    const path4 = `./${accessory.altImage4}`
    if (path) {
      fs.unlink(path, (err) => {
        if (err) {
          return
        }
      })
    }

    if (path1) {
      fs.unlink(path1, (err) => {
        if (err) {
          return
        }
      })
    }
    if (path2) {
      fs.unlink(path2, (err) => {
        if (err) {
          return
        }
      })
    }
    if (path3) {
      fs.unlink(path3, (err) => {
        if (err) {
          return
        }
      })
    }
    if (path4) {
      fs.unlink(path4, (err) => {
        if (err) {
          return
        }
      })
    }
    await accessory.remove()
    res.json({ message: 'Delete Successful' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//@Desc Update Accessory By Id
//@Route PUT /api/accessories/:id
//@Access Private/Admin
const updateAccessory = asyncHandler(async (req, res) => {
  const accessory = await Accessory.findById(req.params.id)

  if (accessory) {
    accessory.name = req.body.name || accessory.name
    accessory.brand = req.body.brand || accessory.brand
    accessory.specs = req.body.specs || accessory.specs
    accessory.year = req.body.year || accessory.year
    accessory.price = req.body.price || accessory.price
    accessory.image = req.body.image || accessory.image
    accessory.altImage1 = req.body.altImage1 || accessory.altImage1
    accessory.altImage2 = req.body.altImage2 || accessory.altImage2
    accessory.altImage3 = req.body.altImage3 || accessory.altImage3
    accessory.altImage4 = req.body.altImage4 || accessory.altImage4
    accessory.countInStock = req.body.countInStock || accessory.countInStock

    const updateAccessory = await accessory.save()

    res.json(updateAccessory)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

module.exports = {
  addAccessory,
  getAccessories,
  getAccessoryById,
  deleteAccessory,
  updateAccessory,
}
