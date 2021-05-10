import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { cellPhoneCreate } from '../../../../actions/cellPhoneActions'
import Loader from '../../../../components/Loader'
import { Message } from '../../../../components/Messages'
import { CELL_CREATE_RESET } from '../../../../constants/productConstants'
import ProductInput from '../../../../components/ProductInput'
import { Link } from 'react-router-dom'

const CellCreate = ({ history }) => {
  const [name, setName] = useState('Test Name')
  const [brand, setBrand] = useState('Test Model')
  const [specs, setSpecs] = useState('Test Specs')
  const [year, setYear] = useState(1999)
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(
    'https://am3pap006files.storage.live.com/y4mPoRAQIrPz3lYF5xASgRdA_nz1cULJWbGMFlhezYIVQgiXm97QOou5-XT64hfHE5Diud8deb-hnQ8PVUcj0Z9Oyrhg9Yz08ibU2HCpMS7insul9KVNngAY5sw1gn_OtC5Cf1fZbLGDJWcGGK7FhOdu8lxH8-b3FXsNs5N1SzN9Y6yoRxSdq68SzTEpFcjzBTP?width=436&height=512&cropmode=none'
  )
  const [altImage1, setAltImage1] = useState(
    'https://am3pap006files.storage.live.com/y4mF0ipGRx5t325lFrSu9sPs-4TLbw8IkOZfe9joRzkQcpVMeq5g_QtA4jc0ppoWDlMk3EQmKU_tEuF-WtBV5mjFvJWaYw9Bcjvs6SrWauoz67hhPqQsHRoDV_934CpsWGogd40zpdW8vfh_Q52Q2_HYMUsnD9rgyT8W4r_CLqBiQHKP8YFcqPNTLeqVP86pq19?width=500&height=400&cropmode=none'
  )
  const [altImage2, setAltImage2] = useState(
    'https://am3pap006files.storage.live.com/y4mszxI3BSy0E3H2gu7n4Ir4fdHMT80skpVpvoQYy8VRI4pg5QAFcFEVz0rg3jnxhGrWRb5VfXvjv01G3UBP8NJyJC_pnMfDFVYRWG8SSJJeXZrP08HqVgx51KwM6R1AEE4M4Wz8QkecWA2jWGDT8vWkPxJMAu5tfsK92HNu4uYPmaAxCniZUqDl5Z5_l0gT1xV?width=350&height=350&cropmode=none'
  )
  const [altImage3, setAltImage3] = useState(
    'https://am3pap006files.storage.live.com/y4mk_E-1eLVw4ZIagRTOKtPxC8AKMWqPJ-KPN4HZ4jJuHZuw6tf07FIg8SC9R3HXZpBmbvc3pDQ8jqxgvS6U3zyyufmv8JbZHzLDyyUKlv4ent7qeJTHzFVvO5RDdQoT34qfAJLnxhqIbjBkL1Wu-oy6_zpV4zpuLxfP3NxKDuhmYVRy-cFo1t9c3LFMve0z2t3?width=700&height=700&cropmode=none'
  )
  const [altImage4, setAltImage4] = useState(
    'https://am3pap006files.storage.live.com/y4mr_xfIBAmM2JbGQYt0BfMyhNbVFmDVCzm7l9IoYfMPaUdd2-_eTHxydSUCdNu0Z86ko0fFeMJ5fgWzVVn5P7PV_Bv_mAL1HwVPJ3a_8TW9RiXKJgSWS17Zq4Zz-DPH3O5yISyIe6GIzp4lTtMXknF58hVnKC4BAru1FalQqzA1xAgSI4Iu9IlYqQydrQtU6HO?width=700&height=700&cropmode=none'
  )
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const createCell = useSelector((state) => state.cellCreate)
  const { loading, error, success } = createCell

  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      dispatch({ type: CELL_CREATE_RESET })
      history.push('/admin/product/cells')
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
      cellPhoneCreate({
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

export default CellCreate
