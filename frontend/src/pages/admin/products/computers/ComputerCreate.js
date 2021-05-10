import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { computerCreate } from '../../../../actions/computerActions'
import Loader from '../../../../components/Loader'
import { Message } from '../../../../components/Messages'
import { COMPUTER_CREATE_RESET } from '../../../../constants/productConstants'
import ProductInput from '../../../../components/ProductInput'
import { Link } from 'react-router-dom'

const ComputerCreate = ({ history }) => {
  const [name, setName] = useState('Test Name')
  const [brand, setBrand] = useState('Test Model')
  const [specs, setSpecs] = useState('Test Specs')
  const [year, setYear] = useState(1999)
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(
    'https://am3pap006files.storage.live.com/y4mxFLjRWpSyEd4YNjrxS_wFWpfH79Yk-_Cll5OMVp1zNTpyEvt1On6k4OvidTZ4qeXVD6UDThse_ghCIUwcoYyqlPWPYaukmFqe8iHa7jQZ7luVHtl-FmSzOOESUJTieq1DKIk5DK12UAyBbNcTCSwba92WI9iVq1zjWqW5XWuxC8TEHFvPcQIRbcnzqy0QYM8?width=512&height=384&cropmode=none'
  )
  const [altImage1, setAltImage1] = useState(
    'https://am3pap006files.storage.live.com/y4m3BC-M4hIWjPzmRvAEEd8z8zrmz6UdL6j4vkYCaYBom0EDz--sagPMZ0e2WgBwEXW1i0TlEAmGkEb-NqXQy0kgUVTNY4PfsN0jwkbVQRIWZ7gH93BFSW_ZTZtBz3kkQzuQMNAME_RsuY7YPSmZrVK7XgvQn5DBhvTCIxpOXW2hwGodAPeQ_-q7LIeA2bNkK28?width=640&height=640&cropmode=none'
  )
  const [altImage2, setAltImage2] = useState(
    'https://am3pap006files.storage.live.com/y4mZ2wnn990LvTjDsilJoYql-xD3OuqIOXnd1uw1O79VVUlHVIj2FwVRMHWm3D5F7C0mHc3K1EmEWnnFuWpA9luuEtH2vdY4lmVMgyBArgVJWW_X8IXZv2mNoRuMsyariZOjhgSMQ_dK56jeBsLQXY3-EBg846s8m4nwwHmDTLX8RMraqGC7HMu8PCGZNpm9G5d?width=920&height=734&cropmode=none'
  )
  const [altImage3, setAltImage3] = useState(
    'https://am3pap006files.storage.live.com/y4mH9KBY1Ukvd6XcoYNg9AZUcgO6K8SGMH5yy3waJxvFxN87FnJ9gppRMuVsEBYD0yB1YEOzMWH5AYP0G1mBz8jZVVvahKpq4XXzX9H1eHMiQ8tDyi052BYM0Pz5eFtuSPM9swAdwBGslAoIaiXHY3AufxSJUbPFjTkZENqWu9N7RHItH6Bx1k7IcRl-ANyRDmX?width=860&height=786&cropmode=none'
  )
  const [altImage4, setAltImage4] = useState(
    'https://am3pap006files.storage.live.com/y4mTe_MoLmc2PLqXyYDAGEhJEf5XTt-4DF-EsoHq40lkiqMd4h2ZU0EQ5A3KzXTb0F-e-lFyogPi3aagOJm2SAVyrgKAzBIcQ7Yo-K4Pu2BKumiIiTNMavnSmEzgXmV_om18-nHKA9VwEwEI8zt80QkR4tcgTHAg9tbwnjNbijfOJnncw0xBHtxvianVde7B2QK?width=1000&height=887&cropmode=none'
  )
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const createComp = useSelector((state) => state.computerCreate)
  const { loading, error, success } = createComp

  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      dispatch({ type: COMPUTER_CREATE_RESET })
      history.push('/admin/product/computers')
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
      computerCreate({
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
      <Link to='/admin/product/computers' className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      <div className='create_product_container'>
        {loading && <Loader />}
        {error && <Message className='danger'>{error}</Message>}
        <h2>Create Product</h2>
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
          />
        </form>
      </div>
    </>
  )
}

export default ComputerCreate
