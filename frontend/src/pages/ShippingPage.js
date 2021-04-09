import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingPage = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [country, setCountry] = useState(shippingAddress.country)
  const [city, setCity] = useState(shippingAddress.city)
  const [street, setStreet] = useState(shippingAddress.street)
  const [postal, setPostal] = useState(shippingAddress.postal)
  const [address, setAddress] = useState(shippingAddress.address)

  const dispatch = useDispatch()

  const saveShippingAddressHandler = (e) => {
    e.preventDefault()

    dispatch(saveShippingAddress({ country, city, street, postal, address }))
    history.push('/p-method')
  }

  return (
    <>
      <Link to={`/cart`} className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      <div className='shipping_container'>
        <h1>Shipping Address</h1>
        <form onSubmit={saveShippingAddressHandler}>
          <label>Country</label>
          <input
            type='text'
            name='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <label>City</label>
          <input
            type='text'
            name='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label>Street</label>
          <input
            type='text'
            name='street'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />

          <label>Postal Code</label>
          <input
            type='number'
            name='postal'
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
          />

          <label>Address</label>
          <input
            type='text'
            name='address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button type='submit'>Continue</button>
        </form>
      </div>
    </>
  )
}

export default ShippingPage
