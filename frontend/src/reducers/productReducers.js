import {
  GET_RECENT_PRODUCT_FAIL,
  GET_RECENT_PRODUCT_REQUEST,
  GET_RECENT_PRODUCT_SUCCESS,
} from '../constants/productConstants'

export const recentProductReducer = (
  state = { cells: {}, tvs: {}, computers: {}, accessories: {} },
  action
) => {
  switch (action.type) {
    case GET_RECENT_PRODUCT_REQUEST:
      return {
        loading: true,
        cells: {},
        tvs: {},
        computers: {},
        accessories: {},
      }
    case GET_RECENT_PRODUCT_SUCCESS:
      return {
        loading: false,
        cells: action.payload.cellphones,
        tvs: action.payload.tvs,
        computers: action.payload.computers,
        accessories: action.payload.accessories,
      }
    case GET_RECENT_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}
