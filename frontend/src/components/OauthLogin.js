import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { oauthUserRegisterAction } from '../actions/oauthUserActions'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'

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

export const Google = ({ close }) => {
  const gRegister = useSelector((state) => state.oauthUserRegister)
  const { userInfo } = gRegister

  const dispatch = useDispatch()

  const responseGoogle = ({ profileObj }) => {
    dispatch(
      oauthUserRegisterAction(
        profileObj.googleId,
        'google',
        profileObj.name,
        profileObj.email,
        profileObj.imageUrl
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
    <GoogleLogin
      clientId='1018570003586-0n1ee576vn73q57tmfq5412785873883.apps.googleusercontent.com'
      autoLoad={false}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      isSignedIn={false}
      render={(renderProps) => (
        <span
          title='Login with Google'
          className='modal-link social'
          onClick={renderProps.onClick}
        >
          <i className='fab fa-google-plus-g'></i>
        </span>
      )}
    />
  )
}
