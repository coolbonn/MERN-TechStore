import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { tvCreate } from '../../../../actions/tvActions'
import Loader from '../../../../components/Loader'
import { Message } from '../../../../components/Messages'
import { TV_CREATE_RESET } from '../../../../constants/tvConstants'

const TvCreate = ({ history }) => {
  const [name, setName] = useState('Test Name')
  const [brand, setBrand] = useState('Test Model')
  const [specs, setSpecs] = useState('Test Specs')
  const [year, setYear] = useState(1999)
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('/images/tvs/sample.png')
  const [altImage1, setAltImage1] = useState('/images/tvs/alt-sample1.jpg')
  const [altImage2, setAltImage2] = useState('/images/tvs/alt-sample2.png')
  const [altImage3, setAltImage3] = useState('/images/tvs/alt-sample3.jpg')
  const [altImage4, setAltImage4] = useState('/images/tvs/alt-sample4.jpg')
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const createTv = useSelector((state) => state.tvCreate)
  const { loading, error, success } = createTv

  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      dispatch({ type: TV_CREATE_RESET })
      history.push('/admin/product/tvs')
    }
  }, [success, dispatch, history])

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

      const { data } = await axios.post('/api/upload', formData, config)
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
      tvCreate({
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
      <Link to='/admin/product/tvs' className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      <div className='create_product_container'>
        {loading && <Loader />}
        {error && <Message className='danger'>{error}</Message>}
        <h2>Create Product</h2>
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

          <button type='submit'>Create Product</button>
        </form>
      </div>
    </>
  )
}

export default TvCreate
