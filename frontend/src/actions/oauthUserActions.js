import axios from 'axios'
import {
  OAUTH_USER_LOGOUT_REQUEST,
  OAUTH_USER_LOGOUT_SUCCESS,
  OAUTH_USER_REGISTER_FAIL,
  OAUTH_USER_REGISTER_REQUEST,
  OAUTH_USER_REGISTER_SUCCESS,
} from '../constants/oauthUserConstants'

export const oauthUserRegisterAction = (
  oauthId,
  from,
  username,
  email,
  image
) => async (dispatch) => {
  try {
    dispatch({ type: OAUTH_USER_REGISTER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/oauth/users',
      { oauthId, from, username, email, image },
      config
    )

    dispatch({ type: OAUTH_USER_REGISTER_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: OAUTH_USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const oauthUserLogoutAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: OAUTH_USER_LOGOUT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete('/api/oauth/logout', config)

    dispatch({ type: OAUTH_USER_LOGOUT_SUCCESS })

    localStorage.removeItem('userInfo')
  } catch (error) {
    dispatch({
      type: OAUTH_USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
