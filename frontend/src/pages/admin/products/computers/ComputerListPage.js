import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../../components/Loader'
import { Message, ContentMessage } from '../../../../components/Messages'
import {
  computerDelete,
  computersList,
} from '../../../../actions/computerActions'
import { PaginateProduct } from '../../../../components/Paginate'

const ComputerListPage = ({ match }) => {
  const pageNumber = match.params.pageNumber

  const compList = useSelector((state) => state.computers)
  const { loading, error, computers, pages, count } = compList

  const deleteComp = useSelector((state) => state.computerDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteComp

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(computersList('', '', '', pageNumber))
  }, [dispatch, successDelete, pageNumber])

  const deleteCompHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(computerDelete(id))
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
        <Link to='/admin/product/computers/create' className='cr_btn'>
          Create New Product
        </Link>
      </div>
      <div className='product_list_container'>
        {loadingDelete && <Loader />}
        {errorDelete && <Message className='danger'>{errorDelete}</Message>}
        {loading && <Loader className='loader_container' />}
        {!loading && computers && (
          <>
            <ContentMessage products={computers} text={'No Products!'} />
            <table>
              <thead>
                <tr>
                  <th>IMAGE</th>
                  <th className='p_t_hide_id'>ID</th>
                  <th>NAME</th>
                  <th className='p_t_hide_brand'>BRAND</th>
                  <th className='p_t_hide_specs'>SPECS</th>
                  <th className='p_t_hide_year'>YEAR</th>
                  <th>PRICE</th>
                  <th>COUNT IN STOCK</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              {error && <Message className='danger'>{error}</Message>}
              {computers.map((comp) => (
                <tbody key={comp._id}>
                  <tr>
                    <td>
                      <img src={comp.image} alt={comp.name} />
                    </td>
                    <td className='p_t_hide_id'>{comp._id}</td>
                    <td>{comp.name}</td>
                    <td className='p_t_hide_brand'>{comp.brand}</td>
                    <td className='p_t_hide_specs'>{comp.specs}</td>
                    <td className='p_t_hide_year'>{comp.year}</td>
                    <td>${comp.price}</td>
                    <td>{comp.countInStock}</td>
                    <td>
                      <Link
                        title='Edit'
                        to={`/admin/product/computers/${comp._id}/edit`}
                      >
                        <i className='far fa-edit'></i>
                      </Link>
                    </td>
                    <td>
                      <i
                        className='fas fa-trash-alt'
                        title='Delete'
                        onClick={() => deleteCompHandler(comp._id)}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <PaginateProduct
              pages={pages}
              isAdmin={true}
              adminRoute={'computers'}
            />
          </>
        )}
      </div>
    </>
  )
}

export default ComputerListPage
