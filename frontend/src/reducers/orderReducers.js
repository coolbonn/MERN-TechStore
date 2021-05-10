import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  DELETE_MY_ORDER_FAIL,
  DELETE_MY_ORDER_REQUEST,
  DELETE_MY_ORDER_SUCCESS,
  MY_OAUTH_USER_ORDER_LIST_FAIL,
  MY_OAUTH_USER_ORDER_LIST_REQUEST,
  MY_OAUTH_USER_ORDER_LIST_RESET,
  MY_OAUTH_USER_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_RESET,
  MY_ORDER_LIST_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from '../constants/orderConstants'

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      }
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const getOrderDetailsReducer = (
  state = { loading: true, cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const updateOrderToPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const updateOrderToDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const myOrderListReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case MY_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case MY_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case MY_ORDER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const deleteMyOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MY_ORDER_REQUEST:
      return {
        loading: true,
      }
    case DELETE_MY_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case DELETE_MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const myOauthUserOrderListReducer = (state = {}, action) => {
  switch (action.type) {
    case MY_OAUTH_USER_ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case MY_OAUTH_USER_ORDER_LIST_SUCCESS:
      return {
        loading: false,
        oauthOrders: action.payload,
      }
    case MY_OAUTH_USER_ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case MY_OAUTH_USER_ORDER_LIST_RESET:
      return {}
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
