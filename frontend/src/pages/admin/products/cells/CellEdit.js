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
import { CELL_EDIT_RESET } from '../../../../constants/productConstants'
import ProductInput from '../../../../components/ProductInput'
import Meta from '../../../../components/Meta'

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
        <Meta title={'Update Cell Phones'} />
        {loading && <Loader />}
        {loadingEdit && <Loader />}
        {errorEdit && <Message className='danger'>{errorEdit}</Message>}
        {error && <Message className='danger'>{error}</Message>}
        <h2>Update Product</h2>
        <form onSubmit={submitHandler}>
          <ProductInput
            name={name}
            setName={setName}
            brand={brand}
            setBrand={setBrand}
            specs={specs}
            setSpecs={setSpecs}
            year={year}
            setYear={setYear}
            price={price}
            setPrice={setPrice}
            countInStock={countInStock}
            setCountInStock={setCountInStock}
            image={image}
            setImage={setImage}
            altImage1={altImage1}
            setAltImage1={setAltImage1}
            altImage2={altImage2}
            setAltImage2={setAltImage2}
            altImage3={altImage3}
            setAltImage3={setAltImage3}
            altImage4={altImage4}
            setAltImage4={setAltImage4}
            uploadFileHandler={uploadFileHandler}
            uploadFile1Handler={uploadFile1Handler}
            uploadFile2Handler={uploadFile2Handler}
            uploadFile3Handler={uploadFile3Handler}
            uploadFile4Handler={uploadFile4Handler}
            uploading={uploading}
            text={'Update Product'}
          />
        </form>
      </div>
    </>
  )
}

export default CellEdit
