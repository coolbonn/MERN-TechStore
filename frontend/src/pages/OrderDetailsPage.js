import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import {
  getOrderDetails,
  updateOrderToPaid,
  updateOrderToDelivered,
} from '../actions/orderActions'
import Loader from '../components/Loader'
import { Message } from '../components/Messages'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderDetailsPage = ({ match }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { error, loading, order } = orderDetails

  const orderPay = useSelector((state) => state.orderPaid)
  const { loading: loadingPay, success: successPay } = orderPay

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDeliver = useSelector((state) => state.orderDelivered)
  const {
    error: errorDeliver,
    loading: loadingDeliver,
    success: successDeliver,
  } = orderDeliver

  const dispatch = useDispatch()

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/${sdkReady}/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, order, successPay, successDeliver, sdkReady])

  const successPaymentHandler = (paymentResult) => {
    dispatch(updateOrderToPaid(orderId, paymentResult))
  }

  const orderDeliveredHandler = () => {
    dispatch(updateOrderToDelivered(orderId))
  }

  return (
    <div>
      {loading && <Loader className='loader_container' />}
      {error && <Message className={'danger'}>{error}</Message>}
      {order && (
        <>
          {userInfo && userInfo.isAdmin ? (
            <Link to='/admin/orders' className='go_back'>
              <i className='fas fa-arrow-circle-left'></i>
            </Link>
          ) : (
            <Link
              to={
                userInfo && userInfo.oauthId
                  ? `/profile/${userInfo._id}`
                  : `/profile`
              }
              className='go_back'
            >
              <i className='fas fa-arrow-circle-left'></i>
            </Link>
          )}
          <div className='order_container'>
            <div className='col_1'>
              <div className='shipping'>
                <h2>Shipping Shipping</h2>
                <hr />
                <h4>
                  Country: <span>{order.shippingAddress.country}</span>
                </h4>
                <h4>
                  City: <span>{order.shippingAddress.city}</span>
                </h4>
                <h4>
                  Street: <span>{order.shippingAddress.street}</span>
                </h4>
                <h4>
                  Postal Code: <span>{order.shippingAddress.postal}</span>
                </h4>
                <h4>
                  Address: <span>{order.shippingAddress.address}</span>
                </h4>
                <br />
                {order.isDelivered ? (
                  <Message className={'success'}>
                    Delivered on {order.deliveredAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message className={'danger'}>Not Delivered</Message>
                )}
              </div>
              <div className='payment'>
                <h2>Payment Method</h2>
                <hr />
                <h4>
                  Method: <span>{order.paymentMethod}</span>
                </h4>
                <br />
                {order.isPaid ? (
                  <Message className={'success'}>
                    Paid on {order.paidAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message className={'danger'}>Not Paid</Message>
                )}
              </div>
              <div className='cart_items'>
                <h2>Items</h2>
                <hr />
                <div className='row'>
                  {order.orderItems.map((item) => (
                    <div key={item._id} className='content'>
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
                  Items: <span>${order.itemsPrice}</span>
                </h4>
                <h4>
                  Shipping: <span>${order.shippingPrice}</span>
                </h4>
                <h4>
                  Tax: <span>${order.taxPrice}</span>
                </h4>
                <h4>
                  Total: <span>${order.totalPrice}</span>
                </h4>
              </div>
              {!order.isPaid && (
                <>
                  {loadingPay && <Loader />}
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                </>
              )}
              {userInfo.isAdmin && (
                <>
                  {loadingDeliver && <Loader />}
                  {errorDeliver && (
                    <Message className='danger'>{errorDeliver}</Message>
                  )}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <button onClick={orderDeliveredHandler}>
                        Update To Delivered
                      </button>
                    )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default OrderDetailsPage
