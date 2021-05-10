import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../../components/Loader'
import { Message } from '../../../../components/Messages'
import { tvDelete, tvsList } from '../../../../actions/tvActions'
import { PaginateProduct } from '../../../../components/Paginate'

const TvListPage = ({ match }) => {
  const pageNumber = match.params.pageNumber

  const tvList = useSelector((state) => state.tvs)
  const { loading, error, tvs, pages, count } = tvList

  const deleteTv = useSelector((state) => state.tvDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteTv

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(tvsList('', '', '', pageNumber))
  }, [dispatch, successDelete, pageNumber])

  const deleteTvHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(tvDelete(id))
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
        <Link to='/admin/product/tvs/create' className='cr_btn'>
          Create New Product
        </Link>
      </div>
      <div className='product_list_container'>
        {loadingDelete && <Loader />}
        {errorDelete && <Message className='danger'>{errorDelete}</Message>}
        {loading && <Loader className='loader_container' />}
        {!loading && tvs && (
          <>
            {tvs && tvs.length === 0 && (
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
              {tvs.map((tv) => (
                <tbody key={tv._id}>
                  <tr>
                    <td>
                      <img src={tv.image} alt={tv.name} />
                    </td>
                    <td className='p_t_hide_id'>{tv._id}</td>
                    <td>{tv.name}</td>
                    <td className='p_t_hide_brand'>{tv.brand}</td>
                    <td className='p_t_hide_specs'>{tv.specs}</td>
                    <td className='p_t_hide_year'>{tv.year}</td>
                    <td>${tv.price}</td>
                    <td>{tv.countInStock}</td>
                    <td>
                      <Link
                        title='Edit'
                        to={`/admin/product/tvs/${tv._id}/edit`}
                      >
                        <i className='far fa-edit'></i>
                      </Link>
                    </td>
                    <td>
                      <i
                        className='fas fa-trash-alt'
                        title='Delete'
                        onClick={() => deleteTvHandler(tv._id)}
                      ></i>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            <PaginateProduct pages={pages} isAdmin={true} adminRoute={'tvs'} />
          </>
        )}
      </div>
    </>
  )
}

export default TvListPage
