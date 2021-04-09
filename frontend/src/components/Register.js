import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userRegisterAction } from '../actions/userActions'
import Loader from './Loader'
import { Message } from './Messages'

const Register = ({ onShut }) => {
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      onShut()
      setusername('')
      setEmail('')
      setAge('')
      setPassword('')
      setConfirmPassword('')
    }
  }, [userInfo, onShut])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Password does not match')
    } else {
      dispatch(userRegisterAction(username, email, age, password))
    }
  }

  return (
    <>
      {loading && <Loader />}
      {error && <Message className='danger'>{error}</Message>}
      <form onSubmit={submitHandler}>
        <h1 className='h1'>Create Account</h1>
        <span className='span'>Use your email for registration</span>
        <input
          type='text'
          placeholder='User Name'
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='number'
          placeholder='age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <p>{message}</p>
        <button className='modal-btn'>Sign Up</button>
      </form>
    </>
  )
}

export default Register
