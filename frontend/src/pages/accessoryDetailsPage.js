import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TechDetails from '../components/TechDetails'
import { accessoryDetails } from '../actions/accessoryActions'
import Loader from '../components/Loader'
import GoBack from '../components/GoBack'
import { Message } from '../components/Messages'

const AccessoryDetailsPage = ({ history, match }) => {
  const accId = match.params.id

  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const accDetails = useSelector((state) => state.accessoryDetails)
  const { loading, error, accessory } = accDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(accessoryDetails(accId))
  }, [dispatch, accId])

  const addToCartHandler = () => {
    if (userInfo) {
      history.push(`/cart/${accId}?qty=${qty}`)
    } else {
      setMessage('Please Login or Register to Use This Feature')
    }
  }

  return (
    <div className='detail_container'>
      <GoBack />
      {error && <Message>{error}</Message>}
      {loading && <Loader className='loader_container' />}
      <TechDetails
        data={accessory}
        qty={qty}
        setQty={setQty}
        addToCartHandler={addToCartHandler}
        message={message}
        noMessage={() => setMessage(null)}
      />
    </div>
  )
}

export default AccessoryDetailsPage
