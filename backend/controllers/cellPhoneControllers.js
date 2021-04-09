const fs = require('fs')
const asyncHandler = require('express-async-handler')
const CellPhone = require('../models/CellPhoneModel')

//@Desc Add new Cell Phones
//@Route POST /api/cellphones
//@Access Private/Admin
const addCellPhones = asyncHandler(async (req, res) => {
  const cellPhones = new CellPhone({
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

  const addedCellPhones = await cellPhones.save()
  res.status(201).json(addedCellPhones)
})

//@Desc Get All Cell Phones
//@Route GET /api/cellphones
//@Access Public
const getCellPhones = asyncHandler(async (req, res) => {
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

  const count = await CellPhone.countDocuments({ ...brandName, ...keyword })

  const cellPhones =
    sortBy === 'none'
      ? await CellPhone.find({})
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'yearasc'
      ? await CellPhone.find({})
          .sort({ year: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'yeardesc'
      ? await CellPhone.find({})
          .sort({ year: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'priceasc'
      ? await CellPhone.find({})
          .sort({ price: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'pricedesc'
      ? await CellPhone.find({})
          .sort({ price: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'oldest'
      ? await CellPhone.find({})
          .sort({ createdAt: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : await CellPhone.find({ ...brandName, ...keyword })
          .sort({ createdAt: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

  res.json({ cellPhones, page, pages: Math.ceil(count / pageSize) })
})

//@Desc Get Cell Phones By Id
//@Route GET /api/cellphones/:id
//@Access Public
const getCellPhoneById = asyncHandler(async (req, res) => {
  const cellPhone = await CellPhone.findById(req.params.id)

  if (cellPhone) {
    res.json(cellPhone)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//@Desc Delete Cell Phones By Id
//@Route DELETE /api/cellphones/:id
//@Access Private/Admin
const deleteCellPhone = asyncHandler(async (req, res) => {
  const cellPhone = await CellPhone.findById(req.params.id)

  if (cellPhone) {
    const path = `./${cellPhone.image}`
    const path1 = `./${cellPhone.altImage1}`
    const path2 = `./${cellPhone.altImage2}`
    const path3 = `./${cellPhone.altImage3}`
    const path4 = `./${cellPhone.altImage4}`
    if (path) {
      fs.unlink(path, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
    }

    if (path1) {
      fs.unlink(path1, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
    }
    if (path2) {
      fs.unlink(path2, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
    }
    if (path3) {
      fs.unlink(path3, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
    }
    if (path4) {
      fs.unlink(path4, (err) => {
        if (err) {
          console.error(err)
          return
        }
      })
    }
    await cellPhone.remove()
    res.json({ message: 'Delete Successful' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//@Desc Update Cell Phones By Id
//@Route PUT /api/cellphones/:id
//@Access Private/Admin
const updateCellPhone = asyncHandler(async (req, res) => {
  const cellPhone = await CellPhone.findById(req.params.id)

  if (cellPhone) {
    cellPhone.name = req.body.name || cellPhone.name
    cellPhone.brand = req.body.brand || cellPhone.brand
    cellPhone.specs = req.body.specs || cellPhone.specs
    cellPhone.year = req.body.year || cellPhone.year
    cellPhone.price = req.body.price || cellPhone.price
    cellPhone.image = req.body.image || cellPhone.image
    cellPhone.altImage1 = req.body.altImage1 || cellPhone.altImage1
    cellPhone.altImage2 = req.body.altImage2 || cellPhone.altImage2
    cellPhone.altImage3 = req.body.altImage3 || cellPhone.altImage3
    cellPhone.altImage4 = req.body.altImage4 || cellPhone.altImage4
    cellPhone.countInStock = req.body.countInStock || cellPhone.countInStock

    const updateCell = await cellPhone.save()

    res.json(updateCell)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

module.exports = {
  addCellPhones,
  getCellPhones,
  getCellPhoneById,
  deleteCellPhone,
  updateCellPhone,
}
