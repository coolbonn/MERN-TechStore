import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  cellPhoneEdit,
  cellPhoneDetails,
} from '../../../../actions/cellPhoneActions'
import Loader from '../../../../components/Loader'
import { Message } from '../../../../components/Messages'
import { CELL_EDIT_RESET } from '../../../../constants/cellPhoneConstants'

const CellEdit = ({ history, match }) => {
  const cellId = match.params.id

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [specs, setSpecs] = useState('')
  const [year, setYear] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [altImage1, setAltImage1] = useState('')
  const [altImage2, setAltImage2] = useState('')
  const [altImage3, setAltImage3] = useState('')
  const [altImage4, setAltImage4] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const detailCell = useSelector((state) => state.cellDetails)
  const { loading, error, cellphone } = detailCell

  const editCell = useSelector((state) => state.cellEdit)
  const {
    loading: loadingEdit,
    error: errorEdit,
    success: successEdit,
  } = editCell

  const dispatch = useDispatch()

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: CELL_EDIT_RESET })
      history.push('/admin/product/cells')
    } else {
      if (!cellphone.name || cellId !== cellphone._id) {
        dispatch(cellPhoneDetails(cellId))
      } else {
        setName(cellphone.name)
        setBrand(cellphone.brand)
        setSpecs(cellphone.specs)
        setYear(cellphone.year)
        setPrice(cellphone.price)
        setImage(cellphone.image)
        setAltImage1(cellphone.altImage1)
        setAltImage2(cellphone.altImage2)
        setAltImage3(cellphone.altImage3)
        setAltImage4(cellphone.altImage4)
        setCountInStock(cellphone.countInStock)
      }
    }
  }, [dispatch, history, cellphone, cellId, successEdit])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(`/api/upload`, formData, config)

      if (data) {
        setImage(data)
      }
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const uploadFile1Handler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      if (data) {
        setAltImage1(data)
      }
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const uploadFile2Handler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      if (data) {
        setAltImage2(data)
      }
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const uploadFile3Handler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      if (data) {
        setAltImage3(data)
      }
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const uploadFile4Handler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      if (data) {
        setAltImage4(data)
      }
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      cellPhoneEdit({
        _id: cellId,
        name,
        brand,
        specs,
        year,
        price,
        image,
        altImage1,
        altImage2,
        altImage3,
        altImage4,
        countInStock,
      })
    )
  }

  return (
    <>
      <Link to='/admin/product/cells' className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      <div className='create_product_container'>
        {loading && <Loader />}
        {loadingEdit && <Loader />}
        {errorEdit && <Message className='danger'>{errorEdit}</Message>}
        {error && <Message className='danger'>{error}</Message>}
        <h2>Update Product</h2>
        <form onSubmit={submitHandler}>
          <label>Name</label>
          <input
            type='text'
            placeholder='Enter Product Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Brand</label>
          <input
            type='text'
            placeholder='Enter Product Model'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          <label>Specs</label>
          <input
            type='text'
            placeholder='Enter Product Specs'
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
          />

          <label>Year</label>
          <input
            type='number'
            placeholder='Enter Product Year'
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <label>Price</label>
          <input
            type='number'
            placeholder='Enter Product Price'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* upload images */}

          <label>Image</label>
          <input
            type='text'
            placeholder='Enter Image Url'
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <label>Image</label>
          <input
            type='file'
            placeholder='Upload Product Image'
            onChange={uploadFileHandler}
          />

          <label>Alt Image 1</label>
          <input
            type='text'
            placeholder='Enter Image Url'
            value={altImage1}
            onChange={(e) => setAltImage1(e.target.value)}
          />
          <label>Alt Image 1</label>
          <input
            type='file'
            placeholder='Upload Product Alt Image 1'
            onChange={uploadFile1Handler}
          />

          <label>Alt Image 2</label>
          <input
            type='text'
            placeholder='Enter Image Url'
            value={altImage2}
            onChange={(e) => setAltImage2(e.target.value)}
          />
          <label>Alt Image 2</label>
          <input
            type='file'
            placeholder='Upload Product Alt Image 2'
            onChange={uploadFile2Handler}
          />

          <label>Alt Image 3</label>
          <input
            type='text'
            placeholder='Enter Image Url'
            value={altImage3}
            onChange={(e) => setAltImage3(e.target.value)}
          />
          <label>Alt Image 3</label>
          <input
            type='file'
            placeholder='Upload Product Alt Image 3'
            onChange={uploadFile3Handler}
          />

          <label>Alt Image 4</label>
          <input
            type='text'
            placeholder='Enter Image Url'
            value={altImage4}
            onChange={(e) => setAltImage4(e.target.value)}
          />
          <label>Alt Image 4</label>
          <input
            type='file'
            placeholder='Upload Product Alt Image 4'
            onChange={uploadFile4Handler}
          />
          {uploading && <Loader />}

          <label>Count In Stock</label>
          <input
            type='number'
            placeholder='Enter Product Quantity'
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />

          <button type='submit'> Update Product</button>
        </form>
      </div>
    </>
  )
}

export default CellEdit
