import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userRegisterAction } from '../actions/userActions'
import Loader from './Loader'

const Register = ({ onShut }) => {
  const [username, setusername] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

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

    if (password !== confirmPassword) {
      setErrMsg('Password does not match')
    } else {
      dispatch(userRegisterAction(username, email, age, password))
    }
  }

  return (
    <>
      {loading && <Loader />}
      {error && <h3 className='errMsg'>{errMsg}</h3>}
      <form onSubmit={submitHandler}>
        <h1 className='h1'>Create Account</h1>
        <span className='span'>Use your email for registration</span>
        <input
          type='text'
          placeholder='User Name'
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='number'
          placeholder='age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className='modal-btn'>Sign Up</button>
      </form>
    </>
  )
}

export default Register
