import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLoginAction } from '../actions/userActions'
import Loader from './Loader'
import { Message } from './Messages'
import { Facebook, Google } from './OauthLogin'

const Login = ({ onShut }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      onShut()
      setEmail('')
      setPassword('')
    }
  }, [userInfo, onShut])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(userLoginAction(email, password))
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        {loading && <Loader />}
        {error && <Message className='danger'>{error}</Message>}
        <h1 className='h1'>Sign in</h1>
        <div className='social-container'>
          <Facebook close={onShut} />
          <Google close={onShut} />
        </div>
        <span className='span'>or use your account</span>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link className='modal-link' to='/'>
          Forgot your password?
        </Link>
        <button className='modal-btn'>Sign In</button>
      </form>
    </>
  )
}

export default Login
