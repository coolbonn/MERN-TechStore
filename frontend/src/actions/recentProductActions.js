import axios from 'axios'
import {
  GET_RECENT_PRODUCT_FAIL,
  GET_RECENT_PRODUCT_REQUEST,
  GET_RECENT_PRODUCT_SUCCESS,
} from '../constants/productConstants'

export const recentProductList = () => async (dispatch) => {
  try {
    dispatch({ type: GET_RECENT_PRODUCT_REQUEST })

    const { data } = await axios.get(`/api/products/recent`)

    dispatch({
      type: GET_RECENT_PRODUCT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: GET_RECENT_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
