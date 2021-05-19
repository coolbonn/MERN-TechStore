import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
import Meta from '../components/Meta'

const OrderPage = ({ history }) => {
  const cart = useSelector((state) => state.cart)

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderInfo = useSelector((state) => state.order)
  const { success, order } = orderInfo

  const dispatch = useDispatch()

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      window.location.reload()
    }
    // eslint-disable-next-line
  }, [history, success])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        taxPrice: cart.taxPrice,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <div>
      <Link to={`/p-method`} className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      <div className='order_container'>
        <Meta
          title={`${cart.shippingAddress.country} || ${cart.paymentMethod}`}
        />
        <div className='col_1'>
          <div className='shipping'>
            <h2>Shipping Address</h2>
            <hr />
            <h4>
              Country: <span>{cart.shippingAddress.country}</span>
            </h4>
            <h4>
              City: <span>{cart.shippingAddress.city}</span>
            </h4>
            <h4>
              Street: <span>{cart.shippingAddress.street}</span>
            </h4>
            <h4>
              Postal Code: <span>{cart.shippingAddress.postal}</span>
            </h4>
            <h4>
              Address: <span>{cart.shippingAddress.address}</span>
            </h4>
          </div>
          <div className='payment'>
            <h2>Payment Method</h2>
            <hr />
            <h4>
              Method: <span>{cart.paymentMethod}</span>
            </h4>
          </div>
          <div className='cart_items'>
            <h2>Items</h2>
            <hr />
            <div className='row'>
              {cart.cartItems.map((item) => (
                <div className='content'>
                  <img src={item.image} alt={item.name} />
                  <Link className='link' to={`/cellphones/${item._id}`}>
                    {item.name}
                  </Link>
                  <span>---</span>
                  <span>
                    {item.qty} x ${item.price} = ${item.qty * item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='col_2'>
          <h2>Order Summery</h2>
          <div className='prices'>
            <h4>
              Items: <span>${cart.itemsPrice}</span>
            </h4>
            <h4>
              Shipping: <span>${cart.shippingPrice}</span>
            </h4>
            <h4>
              Tax: <span>${cart.taxPrice}</span>
            </h4>
            <h4>
              Total: <span>${cart.totalPrice}</span>
            </h4>
          </div>
          <button onClick={placeOrderHandler}>Order Now</button>
        </div>
      </div>
    </div>
  )
}

export default OrderPage
