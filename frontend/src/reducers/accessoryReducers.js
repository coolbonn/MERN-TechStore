import {
  ACCESSORY_CREATE_FAIL,
  ACCESSORY_CREATE_REQUEST,
  ACCESSORY_CREATE_RESET,
  ACCESSORY_CREATE_SUCCESS,
  ACCESSORY_DELETE_FAIL,
  ACCESSORY_DELETE_REQUEST,
  ACCESSORY_DELETE_SUCCESS,
  ACCESSORY_DETAILS_FAIL,
  ACCESSORY_DETAILS_REQUEST,
  ACCESSORY_DETAILS_SUCCESS,
  ACCESSORY_EDIT_FAIL,
  ACCESSORY_EDIT_REQUEST,
  ACCESSORY_EDIT_RESET,
  ACCESSORY_EDIT_SUCCESS,
  ACCESSORY_LIST_FAIL,
  ACCESSORY_LIST_REQUEST,
  ACCESSORY_LIST_SUCCESS,
} from '../constants/productConstants'

export const accessoryListReducer = (state = { accessories: [] }, action) => {
  switch (action.type) {
    case ACCESSORY_LIST_REQUEST:
      return {
        loading: true,
        accessories: [],
      }
    case ACCESSORY_LIST_SUCCESS:
      return {
        loading: false,
        accessories: action.payload.accessories,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
      }
    case ACCESSORY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const accessoryDetailsReducer = (state = { accessory: {} }, action) => {
  switch (action.type) {
    case ACCESSORY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ACCESSORY_DETAILS_SUCCESS:
      return {
        loading: false,
        accessory: action.payload,
      }
    case ACCESSORY_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const accessoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCESSORY_DELETE_REQUEST:
      return {
        loading: true,
      }
    case ACCESSORY_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ACCESSORY_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const accessoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCESSORY_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ACCESSORY_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ACCESSORY_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ACCESSORY_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const accessoryEditReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCESSORY_EDIT_REQUEST:
      return {
        loading: true,
      }
    case ACCESSORY_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ACCESSORY_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ACCESSORY_EDIT_RESET:
      return {}
    default:
      return state
  }
}
