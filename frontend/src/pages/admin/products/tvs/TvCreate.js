import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { tvCreate } from '../../../../actions/tvActions'
import Loader from '../../../../components/Loader'
import { Message } from '../../../../components/Messages'
import { TV_CREATE_RESET } from '../../../../constants/productConstants'
import ProductInput from '../../../../components/ProductInput'
import { Link } from 'react-router-dom'
import Meta from '../../../../components/Meta'

const TvCreate = ({ history }) => {
  const [name, setName] = useState('Test Name')
  const [brand, setBrand] = useState('Test Model')
  const [specs, setSpecs] = useState('Test Specs')
  const [year, setYear] = useState(1999)
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState(
    'https://am3pap006files.storage.live.com/y4mjeEzeYRE7jZmEhr4icRpsWcdGYG1lwoDqTeZJ_TXJrwAEK4EZ33GlzrzT7PWfq72xMpmU-0xjRH8LvGi3_mC2gB_ThJaJkWrWSR1-R3sWaTuyMV7QQx0yDCntj56F-VQiBYXQzJ7ZnwUMtBRbM79p-rIcC1dW8EPWQa3ZuN2eIyHaQZ_cwsnecDcsmhmqOL2?width=2652&height=2751&cropmode=none'
  )
  const [altImage1, setAltImage1] = useState(
    'https://am3pap006files.storage.live.com/y4m_PJxtVpWtBHCU1oLunJu88y3C643HQVfiZgBd9kCZw6F2O4Zwpsi0zzJcIPg3CX5ijrYKnEuYDPfodgPmS_Qt3uwJ8lZzCBUckrn-XwoOMqVlum3W8L7zwQyyH91glV0-cuDXKv6R8EPcXXjVKlpFehvMhZRsKa_KKDpfAUtyqiEbv81iaYfYQRiHTDFMf6F?width=720&height=576&cropmode=none'
  )
  const [altImage2, setAltImage2] = useState(
    'https://am3pap006files.storage.live.com/y4melaJFKpR7I01qrU2z4Kl0c0TWHpDrkWY68KX5oeEDQtnRYdzht14LYz_eQpI8U5BYj4slRZT59k-TT-tPqB_RPLolRyxX8m0QEFXim53PIvmuA1WHmGVQ-CiqXfnZqnJyIW3GYAF09zSo-jofrpHvkuUCvOyFEms6oX9QM2gAN6H-cUPfxnj6Ggo2k6oCVI7?width=720&height=576&cropmode=none'
  )
  const [altImage3, setAltImage3] = useState(
    'https://am3pap006files.storage.live.com/y4mwixESPMDgNcK9U_fOPhrb0-K_gh2ylz0c5FaaA8YdSn8-SgeYDdLJdO01ed1Rgn3gmgFpL6EnTV9yRsum07vOOEWoScWTkAvuLBs-OceCCWhAiwcZzNPwyoB_leAOpDD7mVdY_uhVhXq2ZcEveScGN2rxljuTNK5nAay4ruqdsGv0eR0G5qqk96tQbHAZazN?width=720&height=576&cropmode=none'
  )
  const [altImage4, setAltImage4] = useState(
    'https://am3pap006files.storage.live.com/y4mjhuu-_7YhuygfAEGopsGKO7KojFe2CoStqvF4pHcBUuJZYXxgvek9LKNgQJDndZQHIsmPSl9szw2cKiboHuhlYkdT9ejRXSMij0A-6W46v-dbB3vcdUMOLdmZYGKKI6YzLJ7iDPpcdHuBh7u72kgwN0MmM4SSe241xyq6-ZjpfQWjYGEr4EFuT7LUCQo_4pf?width=330&height=330&cropmode=none'
  )
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
        <Meta title={'Create TV'} />
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

export default TvCreate
