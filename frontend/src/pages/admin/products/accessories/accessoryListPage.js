import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../../components/Loader'
import { Message, ContentMessage } from '../../../../components/Messages'
import {
  accessoryDelete,
  accessoriesList,
} from '../../../../actions/accessoryActions'
import { PaginateProduct } from '../../../../components/Paginate'

const AccessoryListPage = ({ match }) => {
  const pageNumber = match.params.pageNumber

  const accList = useSelector((state) => state.accessories)
  const { loading, error, accessories, pages, count } = accList

  console.log(count)

  const deleteAcc = useSelector((state) => state.accessoryDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteAcc

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(accessoriesList('', '', '', pageNumber))
  }, [dispatch, successDelete, pageNumber])

  const deleteAccHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(accessoryDelete(id))
      if (successDelete) {
        window.location.reload()
      }
    }
  }

  return (
    <>
      <div className='product_list_nav'>
        <Link to='/admin/products' className='go_back'>
          <i className='fas fa-arrow-circle-left'></i>
        </Link>
        <div className='count'>
          <h3>Total Product: {count === 0 ? 0 : count}</h3>
        </div>
        <Link to='/admin/product/accessories/create' className='cr_btn'>
          Create New Product
        </Link>
      </div>
      <div className='product_list_container'>
        {loadingDelete && <Loader />}
        {errorDelete && <Message className='danger'>{errorDelete}</Message>}
        {loading && <Loader className='loader_container' />}
        {!loading && accessories && (
          <>
            <ContentMessage products={accessories} text={'No Products!'} />
            <table>
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th className='p_t_hide_id'>ID</th>
                  <th>NAME</th>
                  <th className='p_t_hide_brand'>TYPE</th>
                  <th className='p_t_hide_specs'>SPECS</th>
                  <th className='p_t_hide_year'>YEAR</th>
                  <th>PRICE</th>
                  <th>COUNT IN STOCK</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {error && <Message className='danger'>{error}</Message>}
              {accessories.map((acc) => (
                <tbody key={acc._id}>
                  <tr>
                    <td>
                      <img src={acc.image} alt={acc.name} />
                    </td>
                    <td className='p_t_hide_id'>{acc._id}</td>
                    <td>{acc.name}</td>
                    <td className='p_t_hide_brand'>{acc.brand}</td>
                    <td className='p_t_hide_specs'>{acc.specs}</td>
                    <td className='p_t_hide_year'>{acc.year}</td>
                    <td>${acc.price}</td>
                    <td>{acc.countInStock}</td>
                    <td>
                      <Link
                        title='Edit'
                        to={`/admin/product/accessories/${acc._id}/edit`}
                      >
                        <i className='far fa-edit'></i>
                      </Link>
                    </td>
                    <td>
                      <i
                        className='fas fa-trash-alt'
                        title='Delete'
                        onClick={() => deleteAccHandler(acc._id)}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <PaginateProduct
              pages={pages}
              isAdmin={true}
              adminRoute={'accessories'}
            />
          </>
        )}
      </div>
    </>
  )
}

export default AccessoryListPage
