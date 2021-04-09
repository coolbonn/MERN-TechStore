import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { orderList } from '../../../actions/orderActions'
import Loader from '../../../components/Loader'
import { Message } from '../../../components/Messages'

const OrderListPage = () => {
  const listOrder = useSelector((state) => state.orderList)
  const { loading, orders, error } = listOrder

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderList())
  }, [dispatch])

  return (
    <>
      <Link to='/admin' className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      <div className='orderList_container'>
        {loading && <Loader className='loader_container' />}
        {error && <Message className='danger'>{error}</Message>}
        {orders && (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER NAME</th>
                <th>DATE</th>
                <th>TOTAL PRICE</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            {orders.map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td>{order._id}</td>
                  <td>
                    {order.oauthUser && order.oauthUser.username}
                    {order.user && order.user.username}
                  </td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                  </td>
                  <td>
                    <Link className='link' to={`/order/${order._id}`}>
                      Details
                    </Link>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        )}
      </div>
    </>
  )
}

export default OrderListPage
