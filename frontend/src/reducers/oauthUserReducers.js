import {
  OAUTH_USER_LOGOUT_FAIL,
  OAUTH_USER_LOGOUT_REQUEST,
  OAUTH_USER_LOGOUT_SUCCESS,
  OAUTH_USER_REGISTER_FAIL,
  OAUTH_USER_REGISTER_REQUEST,
  OAUTH_USER_REGISTER_SUCCESS,
} from '../constants/oauthUserConstants'

export const oauthUserRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case OAUTH_USER_REGISTER_REQUEST:
      return {
        loading: true,
      }
    case OAUTH_USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case OAUTH_USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const oauthUserLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case OAUTH_USER_LOGOUT_REQUEST:
      return {
        loading: true,
      }
    case OAUTH_USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case OAUTH_USER_LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
