import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLoginAction } from '../actions/userActions'
import Loader from './Loader'
import { Facebook, Google } from './OauthLogin'

const Login = ({ onShut }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errMsg, setErrMsg] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      onShut()
      setEmail('')
      setPassword('')
    } else {
      setErrMsg(error)
    }

    const timeOut = setTimeout(() => {
      setErrMsg('')
    }, 3000)

    return () => clearTimeout(timeOut)
  }, [userInfo, onShut, error])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(userLoginAction(email, password))
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        {loading && <Loader />}
        {error && <h3 className='errMsg'>{errMsg}</h3>}
        <h1 className='h1'>Sign in</h1>
        <div className='social-container'>
          <Facebook close={onShut} />
          <Google close={onShut} />
        </div>
        <span className='span'>or use your account</span>
        <input
          type='email'
          placeholder='admin@test.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='123456'
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
