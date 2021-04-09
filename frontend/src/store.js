import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  cellPhoneCreateReducer,
  cellPhoneDeleteReducer,
  cellPhoneDetailsReducer,
  cellPhoneEditReducer,
  cellPhoneReducer,
} from './reducers/cellPhoneReducers'
import {
  getAllUsersReducer,
  userDeleteReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import {
  createOrderReducer,
  getOrderDetailsReducer,
  myOauthUserOrderListReducer,
  myOrderListReducer,
  orderDeleteReducer,
  orderListReducer,
  updateOrderToDeliveredReducer,
  updateOrderToPaidReducer,
} from './reducers/orderReducers'
import {
  oauthUserLogoutReducer,
  oauthUserRegisterReducer,
} from './reducers/oauthUserReducers'
import {
  tvCreateReducer,
  tvDeleteReducer,
  tvDetailsReducer,
  tvEditReducer,
  tvListReducer,
} from './reducers/tvReducers'

const reducer = combineReducers({
  cells: cellPhoneReducer,
  cellDetails: cellPhoneDetailsReducer,
  cellDelete: cellPhoneDeleteReducer,
  cellCreate: cellPhoneCreateReducer,
  cellEdit: cellPhoneEditReducer,
  tvs: tvListReducer,
  tvDetails: tvDetailsReducer,
  tvDelete: tvDeleteReducer,
  tvCreate: tvCreateReducer,
  tvEdit: tvEditReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userDetailsUpdate: userDetailsUpdateReducer,
  users: getAllUsersReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  oauthUserRegister: oauthUserRegisterReducer,
  oauthUserLogout: oauthUserLogoutReducer,
  cart: cartReducer,
  order: createOrderReducer,
  orderDetails: getOrderDetailsReducer,
  orderPaid: updateOrderToPaidReducer,
  orderDelivered: updateOrderToDeliveredReducer,
  myOrders: myOrderListReducer,
  myOauthOrders: myOauthUserOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
