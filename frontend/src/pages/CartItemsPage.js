import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import GoBack from '../components/GoBack'
import Meta from '../components/Meta'

const CartItemsPage = ({ history, location, match }) => {
  const cellId = match.params.id
  const tvId = match.params.id
  const compId = match.params.id
  const accId = match.params.id

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cartProducts = useSelector((state) => state.cart)
  const { cartItems } = cartProducts

  useEffect(() => {
    if (cellId) {
      dispatch(addToCart(cellId, qty, 'cellphones'))
    }
    if (tvId) {
      dispatch(addToCart(tvId, qty, 'tvs'))
    }
    if (compId) {
      dispatch(addToCart(compId, qty, 'computers'))
    }
    if (accId) {
      dispatch(addToCart(accId, qty, 'accessories'))
    }
  }, [dispatch, cellId, tvId, compId, accId, qty])

  const removeCartItemHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/shipping')
  }

  return (
    <div>
      {!userInfo ? (
        <div className='cart_message'>
          <h1>
            Please Login or Register to Be Able to Add Products to the Cart
          </h1>
        </div>
      ) : (
        <>
          <GoBack />
          <div className='cart_grid'>
            <Meta
              title={
                cartItems.length === 0 ? 'No Cart Items' : 'Your Cart Items'
              }
            />
            <div className='col_1'>
              {cartItems.length === 0 ? (
                <h1>Your Cart is Empty</h1>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th className='year'>Year</th>
                      <th className='specs'>Specs</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  {cartItems &&
                    cartItems.map((item) => (
                      <>
                        {item.userId && (
                          <tbody key={item._id}>
                            <tr>
                              <td>
                                <img src={item.image} alt={item.name} />
                              </td>
                              <td>{item.name}</td>
                              <td className='year'>{item.year}</td>
                              <td className='specs'>{item.specs}</td>
                              <td>
                                <select
                                  className='select'
                                  name='quantity'
                                  value={item.qty}
                                  onChange={(e) => {
                                    cellId &&
                                      dispatch(
                                        addToCart(
                                          item._id,
                                          Number(e.target.value),
                                          'cellphones'
                                        )
                                      )
                                    tvId &&
                                      dispatch(
                                        addToCart(
                                          item._id,
                                          Number(e.target.value),
                                          'tvs'
                                        )
                                      )
                                    compId &&
                                      dispatch(
                                        addToCart(
                                          item._id,
                                          Number(e.target.value),
                                          'computers'
                                        )
                                      )
                                    accId &&
                                      dispatch(
                                        addToCart(
                                          item._id,
                                          Number(e.target.value),
                                          'accessories'
                                        )
                                      )
                                  }}
                                >
                                  {[...Array(item.countInStock).keys()].map(
                                    (x) => (
                                      <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                      </option>
                                    )
                                  )}
                                </select>
                              </td>
                              <td>${item.price}</td>
                              <td>
                                <i
                                  className='fas fa-trash-alt'
                                  onClick={() =>
                                    removeCartItemHandler(item._id)
                                  }
                                ></i>
                              </td>
                            </tr>
                          </tbody>
                        )}
                      </>
                    ))}
                </table>
              )}
            </div>
            <div className='col_2'>
              <div>
                <h3>
                  Total Items:{' '}
                  <span>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                </h3>
                <h3>
                  Total Price:{' '}
                  <span>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </h3>
              </div>
              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartItemsPage
