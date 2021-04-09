import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails, userDetailsUpdate } from '../actions/userActions'
import { myOrderList, orderDelete } from '../actions/orderActions'
import Loader from '../components/Loader'
import { Message } from '../components/Messages'

const ProfilePage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const ordersList = useSelector((state) => state.myOrders)
  const { orders, loading, error: errorOrders } = ordersList

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const updUser = useSelector((state) => state.userDetailsUpdate)
  const { success, error: errorUpdateUser } = updUser

  const deleteOrder = useSelector((state) => state.orderDelete)
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = deleteOrder

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.username) {
      dispatch(getUserDetails('profile'))
      dispatch(myOrderList())
    } else {
      setUsername(user.username)
      setEmail(user.email)
      setAge(user.age)
    }
  }, [dispatch, user, successDelete])

  const onSubmitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords Does Not match')
    } else {
      dispatch(
        userDetailsUpdate({ id: user._id, username, email, age, password })
      )
      setShowAlert(true)
      setUsername('')
      setEmail('')
      setAge('')
      setPassword('')
      setConfirmPassword('')
    }
  }

  const deleteOrderHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(orderDelete(id))
      window.location.reload()
    }
  }

  return (
    <>
      <div className='profile_container' onClick={() => setShowAlert(false)}>
        <div className='profile_container_col_1'>
          <h2>Profile Information</h2>
          {showAlert && success && (
            <Message className='success'>Update Successful</Message>
          )}
          {showAlert && errorUpdateUser && (
            <Message className='danger'>{errorUpdateUser}</Message>
          )}
          <form onSubmit={onSubmitHandler}>
            <label>User Name</label>
            <input
              type='text'
              placeholder='Enter Your Name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email</label>
            <input
              type='email'
              placeholder='Enter Your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Age</label>
            <input
              type='number'
              placeholder='Enter Your Age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label>Password</label>
            <input
              type='password'
              placeholder='Enter New Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label>Confirm Password</label>
            <p>{message}</p>
            <input
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type='submit'>Update</button>
          </form>
        </div>
        <div className='profile_container_col_2'>
          <h2>My Orders</h2>
          {successDelete && (
            <Message className='success'>Remove Successful</Message>
          )}
          {loading && <Loader className='profile_loader_container' />}
          {loadingDelete && <Loader className='profile_loader_container' />}
          {orders && orders.length === 0 && (
            <div className='prof_info'>
              <h3>No Orders!</h3>
            </div>
          )}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>ITEMS</th>
                <th>PRICE</th>
                <th>CREATED AT</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {errorDelete && <Message className='danger'>{errorDelete}</Message>}
            {errorOrders ? <Message className='danger' /> : ''}
            {orders &&
              orders.map((order) => (
                <tbody key={order._id}>
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.orderItems.length}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <Link className='link' to={`/order/${order._id}`}>
                          Pay Now
                        </Link>
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
    </>
  )
}

export default ProfilePage
