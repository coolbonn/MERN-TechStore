import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { oauthUserRegisterAction } from '../actions/oauthUserActions'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

export const Facebook = ({ close }) => {
  const fbRegister = useSelector((state) => state.oauthUserRegister)
  const { userInfo } = fbRegister

  const dispatch = useDispatch()

  const responseFacebook = (res) => {
    dispatch(
      oauthUserRegisterAction(
        res.id,
        'facebook',
        res.name,
        res.email,
        res.picture.data.url
      )
    )
  }

  useEffect(() => {
    if (userInfo) {
      close()
      window.location.reload()
    }
  }, [userInfo, close])

  return (
    <FacebookLogin
      appId='887344535143423'
      autoLoad={false}
      fields='name,email,picture'
      callback={responseFacebook}
      render={(renderProps) => (
        <span
          title='Login with Facebook'
          className='modal-link social'
          onClick={renderProps.onClick}
        >
          <i className='fab fa-facebook-f'></i>
        </span>
      )}
    />
  )
}
