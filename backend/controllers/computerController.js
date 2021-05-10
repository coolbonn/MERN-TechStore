const fs = require('fs')
const asyncHandler = require('express-async-handler')
const Computer = require('../models/ComputerModel')

//@Desc Add new Computer
//@Route POST /api/computers
//@Access Private/Admin
const addComputer = asyncHandler(async (req, res) => {
  const computer = new Computer({
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

  const addComputers = await computer.save()
  res.status(201).json(addComputers)
})

//@Desc Get All computers
//@Route GET /api/computers
//@Access Public
const getComputers = asyncHandler(async (req, res) => {
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

  const count = await Computer.countDocuments({ ...brandName, ...keyword })

  const computers =
    sortBy === 'yearasc'
      ? await Computer.find({})
          .sort({ year: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'yeardesc'
      ? await Computer.find({})
          .sort({ year: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'priceasc'
      ? await Computer.find({})
          .sort({ price: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'pricedesc'
      ? await Computer.find({})
          .sort({ price: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'oldest'
      ? await Computer.find({})
          .sort({ createdAt: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : await Computer.find({ ...brandName, ...keyword })
          .sort({ createdAt: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

  res.json({ computers, page, count, pages: Math.ceil(count / pageSize) })
})

//@Desc Get Computer By Id
//@Route GET /api/computers/:id
//@Access Public
const getComputerById = asyncHandler(async (req, res) => {
  const computer = await Computer.findById(req.params.id)

  if (computer) {
    res.json(computer)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//@Desc Delete Computer By Id
//@Route DELETE /api/computer/:id
//@Access Private/Admin
const deleteComputer = asyncHandler(async (req, res) => {
  const computer = await Computer.findById(req.params.id)

  if (computer) {
    const path = `./${computer.image}`
    const path1 = `./${computer.altImage1}`
    const path2 = `./${computer.altImage2}`
    const path3 = `./${computer.altImage3}`
    const path4 = `./${computer.altImage4}`
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
    await computer.remove()
    res.json({ message: 'Delete Successful' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//@Desc Update Computer By Id
//@Route PUT /api/computers/:id
//@Access Private/Admin
const updateComputer = asyncHandler(async (req, res) => {
  const computer = await Computer.findById(req.params.id)

  if (computer) {
    computer.name = req.body.name || computer.name
    computer.brand = req.body.brand || computer.brand
    computer.specs = req.body.specs || computer.specs
    computer.year = req.body.year || computer.year
    computer.price = req.body.price || computer.price
    computer.image = req.body.image || computer.image
    computer.altImage1 = req.body.altImage1 || computer.altImage1
    computer.altImage2 = req.body.altImage2 || computer.altImage2
    computer.altImage3 = req.body.altImage3 || computer.altImage3
    computer.altImage4 = req.body.altImage4 || computer.altImage4
    computer.countInStock = req.body.countInStock || computer.countInStock

    const updateComputer = await computer.save()

    res.json(updateComputer)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

module.exports = {
  addComputer,
  getComputers,
  getComputerById,
  deleteComputer,
  updateComputer,
}
