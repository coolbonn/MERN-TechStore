import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { orderList, orderDelete } from '../../../actions/orderActions'
import Loader from '../../../components/Loader'
import { ContentMessage, Message } from '../../../components/Messages'

const OrderListPage = () => {
  const listOrder = useSelector((state) => state.orderList)
  const { loading, orders, error } = listOrder

  const delOrder = useSelector((state) => state.orderDelete)
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = delOrder

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(orderList())

    if (successDelete) {
      window.location.reload()
    }
  }, [dispatch, successDelete])

  const deleteOrderHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(orderDelete(id))
    }
  }

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
                <th className='o_t_hide_id'>ID</th>
                <th>USER NAME</th>
                <th className='o_t_hide_date'>DATE</th>
                <th>TOTAL PRICE</th>
                <th>PAID</th>
                <th className='o_t_hide_deli'>DELIVERED</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {loadingDelete && <Loader />}
            {errorDelete && (
              <Message className={'danger'}>{errorDelete}</Message>
            )}
            <ContentMessage products={orders} text={'No Orders!'} />
            {orders.map((order) => (
              <tbody key={order._id}>
                <tr>
                  <td className='o_t_hide_id'>{order._id}</td>
                  <td>
                    {order.oauthUser && order.oauthUser.username}
                    {order.user && order.user.username}
                  </td>
                  <td className='o_t_hide_date'>
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times'></i>
                    )}
                  </td>
                  <td className='o_t_hide_deli'>
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
                  <td>
                    <i
                      className='fas fa-trash-alt'
                      title='Delete'
                      onClick={() => deleteOrderHandler(order._id)}
                    ></i>
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
