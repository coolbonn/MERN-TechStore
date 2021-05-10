import axios from 'axios'
import {
  COMPUTER_CREATE_FAIL,
  COMPUTER_CREATE_REQUEST,
  COMPUTER_CREATE_SUCCESS,
  COMPUTER_DELETE_FAIL,
  COMPUTER_DELETE_REQUEST,
  COMPUTER_DELETE_SUCCESS,
  COMPUTER_DETAILS_FAIL,
  COMPUTER_DETAILS_REQUEST,
  COMPUTER_DETAILS_SUCCESS,
  COMPUTER_EDIT_FAIL,
  COMPUTER_EDIT_REQUEST,
  COMPUTER_EDIT_SUCCESS,
  COMPUTER_LIST_FAIL,
  COMPUTER_LIST_REQUEST,
  COMPUTER_LIST_SUCCESS,
} from '../constants/productConstants'

export const computersList = (
  sortBy = '',
  brand = '',
  keyword = '',
  pageNumber = ''
) => async (dispatch) => {
  try {
    dispatch({ type: COMPUTER_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/computers?sortBy=${sortBy}&brand=${brand}&search=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: COMPUTER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: COMPUTER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const computerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: COMPUTER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/computers/${id}`)

    dispatch({ type: COMPUTER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: COMPUTER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const computerDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPUTER_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/computers/${id}`, config)

    dispatch({ type: COMPUTER_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: COMPUTER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const computerCreate = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPUTER_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/computers`, data, config)

    dispatch({ type: COMPUTER_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: COMPUTER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const computerEdit = (computer) => async (dispatch, getState) => {
  try {
    dispatch({ type: COMPUTER_EDIT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/computers/${computer._id}`,
      computer,
      config
    )

    dispatch({ type: COMPUTER_EDIT_SUCCESS })
    dispatch({ type: COMPUTER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: COMPUTER_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
