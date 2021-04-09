import {
  CELL_CREATE_FAIL,
  CELL_CREATE_REQUEST,
  CELL_CREATE_RESET,
  CELL_CREATE_SUCCESS,
  CELL_DELETE_FAIL,
  CELL_DELETE_REQUEST,
  CELL_DELETE_SUCCESS,
  CELL_DETAILS_FAIL,
  CELL_DETAILS_REQUEST,
  CELL_DETAILS_SUCCESS,
  CELL_EDIT_FAIL,
  CELL_EDIT_REQUEST,
  CELL_EDIT_RESET,
  CELL_EDIT_SUCCESS,
  CELL_LIST_FAIL,
  CELL_LIST_REQUEST,
  CELL_LIST_SUCCESS,
} from '../constants/cellPhoneConstants'

export const cellPhoneReducer = (state = { cellphones: [] }, action) => {
  switch (action.type) {
    case CELL_LIST_REQUEST:
      return {
        loading: true,
        cellphones: [],
      }
    case CELL_LIST_SUCCESS:
      return {
        loading: false,
        cellphones: action.payload.cellPhones,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case CELL_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const cellPhoneDetailsReducer = (state = { cellphone: {} }, action) => {
  switch (action.type) {
    case CELL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CELL_DETAILS_SUCCESS:
      return {
        loading: false,
        cellphone: action.payload,
      }
    case CELL_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const cellPhoneDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CELL_DELETE_REQUEST:
      return {
        loading: true,
      }
    case CELL_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CELL_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const cellPhoneCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CELL_CREATE_REQUEST:
      return {
        loading: true,
      }
    case CELL_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CELL_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CELL_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const cellPhoneEditReducer = (state = {}, action) => {
  switch (action.type) {
    case CELL_EDIT_REQUEST:
      return {
        loading: true,
      }
    case CELL_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CELL_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CELL_EDIT_RESET:
      return {}
    default:
      return state
  }
}
