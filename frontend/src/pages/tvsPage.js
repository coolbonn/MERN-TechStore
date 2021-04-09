import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tvsList } from '../actions/tvActions'
import Card from '../components/Card'
import Loader from '../components/Loader'
import { Message } from '../components/Messages'
import ProductSort from '../components/ProductSort'
import { PaginateProduct } from '../components/Paginate'

const TvsPage = ({ match }) => {
  const sortBy = match.params.sortBy
  const brand = match.params.brand
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const tvList = useSelector((state) => state.tvs)
  const { loading, error, tvs, pages } = tvList

  useEffect(() => {
    dispatch(tvsList(sortBy, brand, keyword, pageNumber))
  }, [dispatch, sortBy, brand, keyword, pageNumber])

  return (
    <>
      {loading && <Loader className='loader_container' />}
      {error && <Message className='danger'>{error}</Message>}
      {tvs && (
        <>
          <ProductSort route={'tvs'} />
          <div className='product_list'>
            {tvs.map((data) => (
              <div key={data._id} className='list_items'>
                <Card data={data} route={'tvs'} />
              </div>
            ))}
          </div>
          <PaginateProduct
            pages={pages}
            keyword={keyword ? keyword : ''}
            brand={brand ? brand : ''}
          />
        </>
      )}
    </>
  )
}

export default TvsPage
