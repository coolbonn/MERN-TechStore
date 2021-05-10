import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoBack from '../components/GoBack'
import TechDetails from '../components/TechDetails'
import { computerDetails } from '../actions/computerActions'
import Loader from '../components/Loader'

const ComputerDetailsPage = ({ history, match }) => {
  const compId = match.params.id

  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const compDetails = useSelector((state) => state.computerDetails)
  const { loading, error, computer } = compDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(computerDetails(compId))
  }, [dispatch, compId])

  const addToCartHandler = () => {
    if (userInfo) {
      history.push(`/cart/${compId}?qty=${qty}`)
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
        data={computer}
        qty={qty}
        setQty={setQty}
        addToCartHandler={addToCartHandler}
        message={message}
        noMessage={() => setMessage(null)}
      />
    </div>
  )
}

export default ComputerDetailsPage
