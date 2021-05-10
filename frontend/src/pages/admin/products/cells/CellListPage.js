import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../../components/Loader'
import { Message } from '../../../../components/Messages'
import {
  cellPhoneDelete,
  cellPhonesList,
} from '../../../../actions/cellPhoneActions'
import { PaginateProduct } from '../../../../components/Paginate'

const CellListPage = ({ match }) => {
  const pageNumber = match.params.pageNumber

  const phones = useSelector((state) => state.cells)
  const { loading, error, cellphones, pages, count } = phones

  const deleteCell = useSelector((state) => state.cellDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteCell

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(cellPhonesList('', '', '', pageNumber))
  }, [dispatch, successDelete, pageNumber])

  const deleteCellHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(cellPhoneDelete(id))
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
        <Link to='/admin/product/cells/create' className='cr_btn'>
          Create New Product
        </Link>
      </div>
      <div className='product_list_container'>
        {loadingDelete && <Loader />}
        {errorDelete && <Message className='danger'>{errorDelete}</Message>}
        {loading && <Loader className='loader_container' />}
        {!loading && cellphones && (
          <>
            {cellphones && cellphones.length === 0 && (
              <div className='info'>
                <h3>No Items!</h3>
              </div>
            )}
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
              {cellphones.map((cell) => (
                <tbody key={cell._id}>
                  <tr>
                    <td>
                      <img src={cell.image} alt={cell.name} />
                    </td>
                    <td className='p_t_hide_id'>{cell._id}</td>
                    <td>{cell.name}</td>
                    <td className='p_t_hide_brand'>{cell.brand}</td>
                    <td className='p_t_hide_specs'>{cell.specs}</td>
                    <td className='p_t_hide_year'>{cell.year}</td>
                    <td>${cell.price}</td>
                    <td>{cell.countInStock}</td>
                    <td>
                      <Link
                        title='Edit'
                        to={`/admin/product/cells/${cell._id}/edit`}
                      >
                        <i className='far fa-edit'></i>
                      </Link>
                    </td>
                    <td>
                      <i
                        className='fas fa-trash-alt'
                        title='Delete'
                        onClick={() => deleteCellHandler(cell._id)}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <PaginateProduct
              pages={pages}
              isAdmin={true}
              adminRoute={'cells'}
            />
          </>
        )}
      </div>
    </>
  )
}

export default CellListPage
