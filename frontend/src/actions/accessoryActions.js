import axios from 'axios'
import {
  ACCESSORY_CREATE_FAIL,
  ACCESSORY_CREATE_REQUEST,
  ACCESSORY_CREATE_SUCCESS,
  ACCESSORY_DELETE_FAIL,
  ACCESSORY_DELETE_REQUEST,
  ACCESSORY_DELETE_SUCCESS,
  ACCESSORY_DETAILS_FAIL,
  ACCESSORY_DETAILS_REQUEST,
  ACCESSORY_DETAILS_SUCCESS,
  ACCESSORY_EDIT_FAIL,
  ACCESSORY_EDIT_REQUEST,
  ACCESSORY_EDIT_SUCCESS,
  ACCESSORY_LIST_FAIL,
  ACCESSORY_LIST_REQUEST,
  ACCESSORY_LIST_SUCCESS,
} from '../constants/productConstants'

export const accessoriesList = (
  sortBy = '',
  brand = '',
  keyword = '',
  pageNumber = ''
) => async (dispatch) => {
  try {
    dispatch({ type: ACCESSORY_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/accessories?sortBy=${sortBy}&brand=${brand}&search=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: ACCESSORY_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ACCESSORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const accessoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ACCESSORY_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/accessories/${id}`)

    dispatch({ type: ACCESSORY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCESSORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const accessoryDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCESSORY_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/accessories/${id}`, config)

    dispatch({ type: ACCESSORY_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ACCESSORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const accessoryCreate = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCESSORY_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/accessories`, data, config)

    dispatch({ type: ACCESSORY_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: ACCESSORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const accessoryEdit = (accessory) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCESSORY_EDIT_REQUEST })

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
      `/api/accessories/${accessory._id}`,
      accessory,
      config
    )

    dispatch({ type: ACCESSORY_EDIT_SUCCESS })
    dispatch({ type: ACCESSORY_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ACCESSORY_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
