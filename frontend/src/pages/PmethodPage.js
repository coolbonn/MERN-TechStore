import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import Meta from '../components/Meta'

const PmethodPage = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const onSubmitHandler = (e) => {
    e.preventDefault()

    dispatch(savePaymentMethod(paymentMethod))
    history.push('/order')
  }
  return (
    <>
      <Link to={`/shipping`} className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      <div className='p_method_container'>
        <Meta title={'Payment Method'} />
        <h1>Payment Method</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='p_method'>
            <input
              type='radio'
              id='PayPal'
              name='paymentMethod'
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              checked
            />
            <i className='fab fa-cc-paypal'></i>
            <i className='fas fa-credit-card'></i>
            <label>PayPal or Credit Card</label>
          </div>

          <button type='submit'>Continue</button>
        </form>
      </div>
    </>
  )
}

export default PmethodPage
