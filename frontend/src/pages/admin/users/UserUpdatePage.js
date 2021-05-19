import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails, userUpdateAction } from '../../../actions/userActions'
import { USER_UPDATE_RESET } from '../../../constants/userConstants'
import { Message } from '../../../components/Messages'
import Loader from '../../../components/Loader'
import Meta from '../../../components/Meta'

const UserUpdatePage = ({ history, match }) => {
  const userId = match.params.id

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { error, user, loading } = userDetails

  const updateUser = useSelector((state) => state.userUpdate)
  const {
    error: errorUpdate,
    success: successUpdate,
    loading: loadingUpdate,
  } = updateUser

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/users')
    }
    if (!user.username || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setUsername(user.username)
      setEmail(user.email)
      setAge(user.age)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, history, user, userId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(userUpdateAction({ _id: userId, username, email, age, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/users' className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      {loadingUpdate && <Loader />}
      <div className='userUpdate_container'>
        <Meta title={'Update User'} />
        <h2>Update User</h2>
        {errorUpdate && <Message className='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message className='danger'>{error}</Message>
        ) : (
          <form onSubmit={submitHandler}>
            <label>User Name</label>
            <input
              type='text'
              placeholder='Enter User Name'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>User Email</label>
            <input
              type='email'
              placeholder='Enter User Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>User Age</label>
            <input
              type='number'
              placeholder='Enter User Age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <label>Is Admin</label>
            <input
              type='checkbox'
              placeholder='Enter User Name'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />

            <button type='submit'>Update</button>
          </form>
        )}
      </div>
    </>
  )
}

export default UserUpdatePage
