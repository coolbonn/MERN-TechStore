import axios from 'axios'
import {
  TV_CREATE_FAIL,
  TV_CREATE_REQUEST,
  TV_CREATE_SUCCESS,
  TV_DELETE_FAIL,
  TV_DELETE_REQUEST,
  TV_DELETE_SUCCESS,
  TV_DETAILS_FAIL,
  TV_DETAILS_REQUEST,
  TV_DETAILS_SUCCESS,
  TV_EDIT_FAIL,
  TV_EDIT_REQUEST,
  TV_EDIT_SUCCESS,
  TV_LIST_FAIL,
  TV_LIST_REQUEST,
  TV_LIST_SUCCESS,
} from '../constants/tvConstants'

export const tvsList = (
  sortBy = '',
  brand = '',
  keyword = '',
  pageNumber = ''
) => async (dispatch) => {
  try {
    dispatch({ type: TV_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/tvs?sortBy=${sortBy}&brand=${brand}&search=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: TV_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TV_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const tvDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TV_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/tvs/${id}`)

    dispatch({ type: TV_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TV_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const tvDelete = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TV_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/tvs/${id}`, config)

    dispatch({ type: TV_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TV_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const tvCreate = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: TV_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/tvs`, data, config)

    dispatch({ type: TV_CREATE_SUCCESS })
  } catch (error) {
    dispatch({
      type: TV_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const tvEdit = (tv) => async (dispatch, getState) => {
  try {
    dispatch({ type: TV_EDIT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/tvs/${tv._id}`, tv, config)

    dispatch({ type: TV_EDIT_SUCCESS })
    dispatch({ type: TV_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TV_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
