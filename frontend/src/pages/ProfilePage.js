import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  getUserDetails,
  userDetailsUpdate,
  userDeleteProfile,
  logoutAction,
} from '../actions/userActions'
import {
  myOrderList,
  deleteMyOrder,
  orderDelete,
} from '../actions/orderActions'
import Loader from '../components/Loader'
import { ContentMessage, Message, AlertMessage } from '../components/Messages'

const ProfilePage = ({ history }) => {
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

  const deleteMyOrders = useSelector((state) => state.deleteMyOrder)
  const { success: successDelete, error: errorDelete } = deleteMyOrders

  const deleteOrder = useSelector((state) => state.orderDelete)
  const {
    success: successDeleteOrder,
    loading: loadingDeleteOrder,
    error: errorDeleteOrder,
  } = deleteOrder

  const deleteUser = useSelector((state) => state.userDeleteProfile)
  const {
    success: successDeleteProfile,
    loading: loadingDeleteProfile,
    error: errorDeleteProfile,
  } = deleteUser

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

    if (successDeleteProfile) {
      dispatch(logoutAction())
      history.push('/')
    }
  }, [
    dispatch,
    user,
    successDelete,
    successDeleteOrder,
    history,
    successDeleteProfile,
  ])

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
    dispatch(orderDelete(id))
    window.location.reload()
  }

  const deleteUserHandler = () => {
    dispatch(userDeleteProfile())
    dispatch(deleteMyOrder())
  }

  return (
    <>
      <div className='profile_container'>
        {loadingDeleteProfile && <Loader />}
        {errorDeleteProfile && (
          <Message className='danger'>{errorDeleteProfile}</Message>
        )}
        {showAlert && (
          <AlertMessage
            text={'Are You Sure?'}
            btnTxt={'Delete'}
            onCancel={() => setShowAlert(false)}
            onDelete={deleteUserHandler}
          />
        )}
        <div className='col_1'>
          <h2>Profile Information</h2>
          {success && <Message className='success'>Update Successful</Message>}
          {errorUpdateUser && (
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
          <button onClick={() => setShowAlert(true)}>Delete Account</button>
        </div>
        <div className='col_2'>
          <h2>My Orders</h2>
          {loadingDeleteOrder && (
            <Loader className='profile_loader_container' />
          )}
          {errorDeleteOrder && (
            <Message className={'danger'}>{errorDeleteOrder}</Message>
          )}
          {loading && <Loader className='profile_loader_container' />}
          <ContentMessage
            products={orders}
            contentMsgClass={'prof_info'}
            text={'No Orders!'}
          />
          <table>
            <thead>
              <tr>
                <th className='id'>ID</th>
                <th>ITEMS</th>
                <th>PRICE</th>
                <th className='crt'>CREATED AT</th>
                <th>PAID</th>
                <th className='deli'>DELIVERED</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            {errorDelete && <Message className='danger'>{errorDelete}</Message>}
            {errorOrders ? <Message className='danger' /> : ''}
            {orders &&
              orders.map((order) => (
                <>
                  <tbody key={order._id}>
                    <tr>
                      <td className='id'>{order._id}</td>
                      <td>{order.orderItems.length}</td>
                      <td>${order.totalPrice}</td>
                      <td className='crt'>
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
                      <td className='deli'>
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
                          onClick={() => setShowAlert(true)}
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                  {showAlert && (
                    <AlertMessage
                      text={'Are You Sure?'}
                      btnTxt={'Delete'}
                      onCancel={() => setShowAlert(false)}
                      onDelete={() => deleteOrderHandler(order._id)}
                    />
                  )}
                </>
              ))}
          </table>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
