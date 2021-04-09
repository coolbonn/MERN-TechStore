import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logoutAction } from '../actions/userActions'
import { oauthUserLogoutAction } from '../actions/oauthUserActions'
import Loader from './Loader'

const UserDropdown = ({ openDropdown, closeDropdown }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userLogout = useSelector((state) => state.oauthUserLogout)
  const { success, loading } = userLogout

  const history = useHistory()

  useEffect(() => {
    if (success) {
      window.location.reload()
    }
  }, [success])

  const logoutHandler = () => {
    if (!userInfo.oauthId) {
      dispatch(logoutAction())
      history.push('/')
    } else {
      dispatch(oauthUserLogoutAction())
      history.push('/')
    }
  }

  return (
    <>
      {loading && <Loader />}
      {openDropdown && (
        <div className='user_dropdown_content' onMouseLeave={closeDropdown}>
          <Link
            className='user_dropdown_content_link'
            to={
              userInfo && userInfo.oauthId
                ? `/profile/${userInfo._id}`
                : `/profile`
            }
          >
            Profile
          </Link>
          {userInfo && userInfo.isAdmin && (
            <>
              <br />
              <Link className='user_dropdown_content_link' to={`/admin`}>
                Admin
              </Link>
            </>
          )}
          <hr />
          <p onClick={logoutHandler}>Logout</p>
        </div>
      )}
    </>
  )
}

export default UserDropdown
