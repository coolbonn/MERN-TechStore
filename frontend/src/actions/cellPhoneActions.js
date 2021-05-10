import axios from 'axios'
import {
  CELL_CREATE_FAIL,
  CELL_CREATE_REQUEST,
  CELL_CREATE_SUCCESS,
  CELL_DELETE_FAIL,
  CELL_DELETE_REQUEST,
  CELL_DELETE_SUCCESS,
  CELL_DETAILS_FAIL,
  CELL_DETAILS_REQUEST,
  CELL_DETAILS_SUCCESS,
  CELL_EDIT_FAIL,
  CELL_EDIT_REQUEST,
  CELL_EDIT_SUCCESS,
  CELL_LIST_FAIL,
  CELL_LIST_REQUEST,
  CELL_LIST_SUCCESS,
} from '../constants/productConstants'

export const cellPhonesList = (
  sortBy = '',
  brand = '',
  keyword = '',
  pageNumber = ''
) => async (dispatch) => {
  try {
    dispatch({ type: CELL_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/cellphones?sortBy=${sortBy}&brand=${brand}&search=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: CELL_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CELL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const cellPhoneDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CELL_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/cellphones/${id}`)

    dispatch({ type: CELL_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CELL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const cellPhoneDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CELL_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/cellphones/${id}`, config)

    dispatch({ type: CELL_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CELL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const cellPhoneCreate = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: CELL_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/cellphones`, data, config)

    dispatch({ type: CELL_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: CELL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const cellPhoneEdit = (cell) => async (dispatch, getState) => {
  try {
    dispatch({ type: CELL_EDIT_REQUEST })

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
      `/api/cellphones/${cell._id}`,
      cell,
      config
    )

    dispatch({ type: CELL_EDIT_SUCCESS })
    dispatch({ type: CELL_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CELL_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
