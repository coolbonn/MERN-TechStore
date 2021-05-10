import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GoBack from '../components/GoBack'
import TechDetails from '../components/TechDetails'
import { tvDetails } from '../actions/tvActions'
import Loader from '../components/Loader'

const TvDetailsPage = ({ history, match }) => {
  const tvId = match.params.id

  const [qty, setQty] = useState(1)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const TvDetails = useSelector((state) => state.tvDetails)
  const { loading, error, tv } = TvDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(tvDetails(tvId))
  }, [dispatch, tvId])

  const addToCartHandler = () => {
    if (userInfo) {
      history.push(`/cart/${tvId}?qty=${qty}`)
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
        data={tv}
        qty={qty}
        setQty={setQty}
        addToCartHandler={addToCartHandler}
        message={message}
        noMessage={() => setMessage(null)}
      />
    </div>
  )
}

export default TvDetailsPage
