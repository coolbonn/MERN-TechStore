import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoBack from '../components/GoBack'
import TechDetails from '../components/TechDetails'
import { cellPhoneDetails } from '../actions/cellPhoneActions'
import Loader from '../components/Loader'

const CellPhoneDetailsPage = ({ history, match }) => {
  const cellId = match.params.id

  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const PhoneDetails = useSelector((state) => state.cellDetails)
  const { loading, error, cellphone } = PhoneDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(cellPhoneDetails(cellId))
  }, [dispatch, cellId])

  const addToCartHandler = () => {
    if (userInfo) {
      history.push(`/cart/${cellId}?qty=${qty}`)
    } else {
      setMessage('Please Login or Register to Use This Feature')
    }
  }

  return (
    <div className='detail_container'>
      <GoBack />
      {error && <p>{error}</p>}
      {loading && <Loader className='loader_container' />}
      <TechDetails
        data={cellphone}
        qty={qty}
        setQty={setQty}
        addToCartHandler={addToCartHandler}
        message={message}
        noMessage={() => setMessage(null)}
      />
    </div>
  )
}

export default CellPhoneDetailsPage
