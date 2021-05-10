import {
  COMPUTER_CREATE_FAIL,
  COMPUTER_CREATE_REQUEST,
  COMPUTER_CREATE_RESET,
  COMPUTER_CREATE_SUCCESS,
  COMPUTER_DELETE_FAIL,
  COMPUTER_DELETE_REQUEST,
  COMPUTER_DELETE_SUCCESS,
  COMPUTER_DETAILS_FAIL,
  COMPUTER_DETAILS_REQUEST,
  COMPUTER_DETAILS_SUCCESS,
  COMPUTER_EDIT_FAIL,
  COMPUTER_EDIT_REQUEST,
  COMPUTER_EDIT_RESET,
  COMPUTER_EDIT_SUCCESS,
  COMPUTER_LIST_FAIL,
  COMPUTER_LIST_REQUEST,
  COMPUTER_LIST_SUCCESS,
} from '../constants/productConstants'

export const computerListReducer = (state = { computers: [] }, action) => {
  switch (action.type) {
    case COMPUTER_LIST_REQUEST:
      return {
        loading: true,
        computers: [],
      }
    case COMPUTER_LIST_SUCCESS:
      return {
        loading: false,
        computers: action.payload.computers,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
      }
    case COMPUTER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const computerDetailsReducer = (state = { computer: {} }, action) => {
  switch (action.type) {
    case COMPUTER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case COMPUTER_DETAILS_SUCCESS:
      return {
        loading: false,
        computer: action.payload,
      }
    case COMPUTER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const computerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPUTER_DELETE_REQUEST:
      return {
        loading: true,
      }
    case COMPUTER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case COMPUTER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const computerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPUTER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case COMPUTER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case COMPUTER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case COMPUTER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const computerEditReducer = (state = {}, action) => {
  switch (action.type) {
    case COMPUTER_EDIT_REQUEST:
      return {
        loading: true,
      }
    case COMPUTER_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case COMPUTER_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case COMPUTER_EDIT_RESET:
      return {}
    default:
      return state
  }
}
