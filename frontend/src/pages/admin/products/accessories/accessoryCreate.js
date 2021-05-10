import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../../components/Loader'
import { Message } from '../../../../components/Messages'
import { ACCESSORY_CREATE_RESET } from '../../../../constants/productConstants'
import { accessoryCreate } from '../../../../actions/accessoryActions'
import ProductInput from '../../../../components/ProductInput'
import { Link } from 'react-router-dom'

const AccessoryCreate = ({ history }) => {
  const [name, setName] = useState('Test Name')
  const [brand, setBrand] = useState('Test Model')
  const [specs, setSpecs] = useState('Test Specs')
  const [year, setYear] = useState(1999)
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(
    'https://am3pap006files.storage.live.com/y4m3WJiYMU4eqt0dpVcqyNZqPktJA7ELb60WezTpBeIVywDoJXUiIsnD8i1vzY0q0c6kOd_TUIvY7wMtIqvq5xKVCl-QlxYygHvIuxwxi4TTYN_kDayHf37aqP0zwDaWsg6G84qum1DI2iVHhdTXbk7q3MmPOk-fnwOHR4N_Z2mYfGUUtrScwZA7a0Er7VKw-TZ?width=512&height=300&cropmode=none'
  )
  const [altImage1, setAltImage1] = useState(
    'https://am3pap006files.storage.live.com/y4miXT2-klW0gbsyb2Szk0nMa39ryGnXJ85X_Uo4iBYHQmKlW8KIBNi6Qw52OV7vE1eoQiEzLbjj0fP5PImnUfI5FHcLz57L3GtIFoV3BZ7t3SlXED1WhwGLCtiyWRQDntiX-ycQyKuJFk5X8HmYt4BHD6h-UAJ_IqhBYTbJMZnTOcFJL-BSaT3gmXi8HGlRnJw?width=500&height=500&cropmode=none'
  )
  const [altImage2, setAltImage2] = useState(
    'https://am3pap006files.storage.live.com/y4mQYP8HNyWmNx9er2gMfBn2O3I1qm5A8yXfrUvT3GCGaBvbk6WLMAXQO0uAYfv25XY16TsIqW6J6JSt21QsCIux3QtqKlixK9-tDkTSbp249-NGNDbCNpqiboa28D6VolCRs81xy24Gs3Z1LjeEcxw4BDfTorAmb-Y4kxaZ3GwIml16aIfCAId0tm_IlYbOj7q?width=3000&height=3000&cropmode=none'
  )
  const [altImage3, setAltImage3] = useState(
    'https://am3pap006files.storage.live.com/y4m4fmFR31KYRe6dEH7rwdPrnQP8RsREzDDACNJwpqyH304zeFjiqc0L9wkLkbJuIrPoB12w7vq1BMgf-iEJun0nJ1pL2HxxXRCAWcudDz-BdxHEmBoY7CUPRdEIX-EOmOkOM7umrWTS7-MWVBlkLuqBdtNGmlM6iN0ngkVIjteOZ68M1KVL-rA_Zate7Jy_Acn?width=1500&height=1200&cropmode=none'
  )
  const [altImage4, setAltImage4] = useState(
    'https://am3pap006files.storage.live.com/y4myo_NT9veI4D5iIcc6Xkn_gL8veYzyMoHtS6eKbApH-HIQZOjfnZ93Ofjl4va6KvL_zeqdgtYmX9qfNhZstGT9yQrwmjfJdAztyMhZv2iMijmLHMyh38-qegeXiAZs5k0WLXfekO30r0TdA1lu794nEH34HCx9VwpJcLtCFLaUzeDxc6gqb6iR3_vmdzTNCZy?width=900&height=900&cropmode=none'
  )
  const [countInStock, setCountInStock] = useState(0)
  const [uploading, setUploading] = useState(false)

  const createAcc = useSelector((state) => state.accessoryCreate)
  const { loading, error, success } = createAcc

  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      dispatch({ type: ACCESSORY_CREATE_RESET })
      history.push('/admin/product/accessories')
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
      accessoryCreate({
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
      <Link to='/admin/product/accessories' className='go_back'>
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

export default AccessoryCreate
