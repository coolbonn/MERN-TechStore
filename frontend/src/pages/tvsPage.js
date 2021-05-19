import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tvsList } from '../actions/tvActions'
import Card from '../components/Card'
import Loader from '../components/Loader'
import { ContentMessage, Message } from '../components/Messages'
import { TvSort } from '../components/ProductSort'
import { PaginateProduct } from '../components/Paginate'
import Meta from '../components/Meta'

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
      <ContentMessage
        products={tvs}
        contentMsgClass={loading ? 'empty' : 'info'}
        text={'No Products!'}
      />
      <Meta title={'Tvs'} content={'Choose tvs that fit your needs'} />
      {loading && <Loader className='loader_container' />}
      {error && <Message className='danger'>{error}</Message>}
      {tvs && (
        <>
          <TvSort />
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
            route={'tvs'}
          />
        </>
      )}
    </>
  )
}

export default TvsPage
