import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { computersList } from '../actions/computerActions'
import Card from '../components/Card'
import Loader from '../components/Loader'
import { ContentMessage, Message } from '../components/Messages'
import { ComputerSort } from '../components/ProductSort'
import { PaginateProduct } from '../components/Paginate'

const ComputerPage = ({ match }) => {
  const sortBy = match.params.sortBy
  const brand = match.params.brand
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const CompList = useSelector((state) => state.computers)
  const { loading, error, computers, pages } = CompList

  useEffect(() => {
    dispatch(computersList(sortBy, brand, keyword, pageNumber))
  }, [dispatch, sortBy, brand, keyword, pageNumber])

  return (
    <>
      <ContentMessage
        products={computers}
        contentMsgClass={loading ? 'empty' : 'info'}
        text={'No Products!'}
      />
      {loading && <Loader className='loader_container' />}
      {error && <Message className='danger'>{error}</Message>}
      {computers && (
        <>
          <ComputerSort />
          <div className='product_list'>
            {computers.map((data) => (
              <div key={data._id} className='list_items'>
                <Card data={data} route={'computers'} />
              </div>
            ))}
          </div>
          <PaginateProduct
            pages={pages}
            keyword={keyword ? keyword : ''}
            brand={brand ? brand : ''}
            route={'computers'}
          />
        </>
      )}
    </>
  )
}

export default ComputerPage
