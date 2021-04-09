import {
  TV_CREATE_FAIL,
  TV_CREATE_REQUEST,
  TV_CREATE_RESET,
  TV_CREATE_SUCCESS,
  TV_DELETE_FAIL,
  TV_DELETE_REQUEST,
  TV_DELETE_SUCCESS,
  TV_DETAILS_FAIL,
  TV_DETAILS_REQUEST,
  TV_DETAILS_SUCCESS,
  TV_EDIT_FAIL,
  TV_EDIT_REQUEST,
  TV_EDIT_RESET,
  TV_EDIT_SUCCESS,
  TV_LIST_FAIL,
  TV_LIST_REQUEST,
  TV_LIST_SUCCESS,
} from '../constants/tvConstants'

export const tvListReducer = (state = { tvs: [] }, action) => {
  switch (action.type) {
    case TV_LIST_REQUEST:
      return {
        loading: true,
        tvs: [],
      }
    case TV_LIST_SUCCESS:
      return {
        loading: false,
        tvs: action.payload.tvs,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case TV_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const tvDetailsReducer = (state = { tv: {} }, action) => {
  switch (action.type) {
    case TV_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case TV_DETAILS_SUCCESS:
      return {
        loading: false,
        tv: action.payload,
      }
    case TV_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const tvDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TV_DELETE_REQUEST:
      return {
        loading: true,
      }
    case TV_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case TV_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const tvCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TV_CREATE_REQUEST:
      return {
        loading: true,
      }
    case TV_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case TV_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TV_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const tvEditReducer = (state = {}, action) => {
  switch (action.type) {
    case TV_EDIT_REQUEST:
      return {
        loading: true,
      }
    case TV_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case TV_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case TV_EDIT_RESET:
      return {}
    default:
      return state
  }
}
