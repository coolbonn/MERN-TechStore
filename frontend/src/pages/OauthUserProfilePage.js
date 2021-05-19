import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { myOauthUserOrderList, orderDelete } from '../actions/orderActions'
import { Message, ContentMessage } from '../components/Messages'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

const OauthUserProfilePage = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const ordersList = useSelector((state) => state.myOauthOrders)
  const {
    oauthOrders,
    loading: loadingOauthOrders,
    error: errorOauthOrders,
  } = ordersList

  const deleteOrder = useSelector((state) => state.orderDelete)
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = deleteOrder

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(myOauthUserOrderList())

    if (successDelete) {
      window.location.reload()
    }
  }, [dispatch, successDelete])

  const deleteOrderHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(orderDelete(id))
    }
  }

  return (
    <div className='oauthUser_container'>
      <Meta title={`${userInfo.username}'s Profile`} />
      <div className='content'>
        <h1>{userInfo.username}</h1>
        <img src={userInfo.image} alt={userInfo.username} />
      </div>
      <hr />
      <div className='oauthUser_table'>
        <ContentMessage
          products={oauthOrders}
          contentMsgClass={'oauth_prof_info'}
          text={'No Orders!'}
        />
        <h2>My Orders</h2>
        <table>
          <thead>
            <tr>
              <th className='pr_t_hide_id'>ID</th>
              <th>ITEMS</th>
              <th>PRICE</th>
              <th className='pr_t_hide_crt'>CREATED AT</th>
              <th>PAID</th>
              <th className='pr_t_hide_deli'>DELIVERED</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          {loadingDelete && <Loader />}
          {loadingOauthOrders && <Loader />}
          {errorDelete && <Message className='danger'>{errorDelete}</Message>}
          {errorOauthOrders && errorOauthOrders && (
            <Message className='danger'>{errorOauthOrders}</Message>
          )}
          {oauthOrders &&
            oauthOrders.map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td className='pr_t_hide_id'>{order._id}</td>
                  <td>{order.orderItems.length}</td>
                  <td>${order.totalPrice}</td>
                  <td className='pr_t_hide_crt'>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <Link className='link' to={`/order/${order._id}`}>
                        Pay Now
                      </Link>
                    )}
                  </td>
                  <td className='pr_t_hide_deli'>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                  </td>
                  <td>
                    {!order.isPaid ? (
                      <p title="You Haven't Paid Yet">Details</p>
                    ) : (
                      <Link to={`/order/${order._id}`} className='link'>
                        Details
                      </Link>
                    )}
                  </td>
                  <td>
                    <i
                      className='fas fa-trash-alt'
                      onClick={() => deleteOrderHandler(order._id)}
                    ></i>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  )
}

export default OauthUserProfilePage
