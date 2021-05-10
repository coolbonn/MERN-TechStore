const fs = require('fs')
const asyncHandler = require('express-async-handler')
const Tv = require('../models/TvModel')

//@Desc Add new TV
//@Route POST /api/tvs
//@Access Private/Admin
const addTv = asyncHandler(async (req, res) => {
  const tv = new Tv({
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

  const addTvs = await tv.save()
  res.status(201).json(addTvs)
})

//@Desc Get All Tvs
//@Route GET /api/tvs
//@Access Public
const getTvs = asyncHandler(async (req, res) => {
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

  const count = await Tv.countDocuments({ ...brandName, ...keyword })

  const tvs =
    sortBy === 'yearasc'
      ? await Tv.find({})
          .sort({ year: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'yeardesc'
      ? await Tv.find({})
          .sort({ year: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'priceasc'
      ? await Tv.find({})
          .sort({ price: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'pricedesc'
      ? await Tv.find({})
          .sort({ price: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : sortBy === 'oldest'
      ? await Tv.find({})
          .sort({ createdAt: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))
          .exec()
      : await Tv.find({ ...brandName, ...keyword })
          .sort({ createdAt: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1))

  res.json({ tvs, page, count, pages: Math.ceil(count / pageSize) })
})

//@Desc Get tv By Id
//@Route GET /api/tvs/:id
//@Access Public
const getTvById = asyncHandler(async (req, res) => {
  const tv = await Tv.findById(req.params.id)

  if (tv) {
    res.json(tv)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//@Desc Delete Tv By Id
//@Route DELETE /api/tvs/:id
//@Access Private/Admin
const deleteTv = asyncHandler(async (req, res) => {
  const tv = await Tv.findById(req.params.id)

  if (tv) {
    const path = `./${tv.image}`
    const path1 = `./${tv.altImage1}`
    const path2 = `./${tv.altImage2}`
    const path3 = `./${tv.altImage3}`
    const path4 = `./${tv.altImage4}`
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
    await tv.remove()
    res.json({ message: 'Delete Successful' })
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

//@Desc Update Tv By Id
//@Route PUT /api/tvs/:id
//@Access Private/Admin
const updateTv = asyncHandler(async (req, res) => {
  const tv = await Tv.findById(req.params.id)

  if (tv) {
    tv.name = req.body.name || tv.name
    tv.brand = req.body.brand || tv.brand
    tv.specs = req.body.specs || tv.specs
    tv.year = req.body.year || tv.year
    tv.price = req.body.price || tv.price
    tv.image = req.body.image || tv.image
    tv.altImage1 = req.body.altImage1 || tv.altImage1
    tv.altImage2 = req.body.altImage2 || tv.altImage2
    tv.altImage3 = req.body.altImage3 || tv.altImage3
    tv.altImage4 = req.body.altImage4 || tv.altImage4
    tv.countInStock = req.body.countInStock || tv.countInStock

    const updateTv = await tv.save()

    res.json(updateTv)
  } else {
    res.status(404)
    throw new Error('Product Not Found')
  }
})

module.exports = {
  addTv,
  getTvs,
  getTvById,
  deleteTv,
  updateTv,
}
