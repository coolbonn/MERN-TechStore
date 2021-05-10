import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cellPhonesList } from '../actions/cellPhoneActions'
import Card from '../components/Card'
import Loader from '../components/Loader'
import { ContentMessage, Message } from '../components/Messages'
import { CellSort } from '../components/ProductSort'
import { PaginateProduct } from '../components/Paginate'

const CellPhonePage = ({ match }) => {
  const sortBy = match.params.sortBy
  const brand = match.params.brand
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const PhonesList = useSelector((state) => state.cells)
  const { loading, error, cellphones, pages } = PhonesList

  useEffect(() => {
    dispatch(cellPhonesList(sortBy, brand, keyword, pageNumber))
  }, [dispatch, sortBy, brand, keyword, pageNumber])

  return (
    <>
      <ContentMessage
        products={cellphones}
        contentMsgClass={loading ? 'empty' : 'info'}
        text={'No Products!'}
      />
      {loading && <Loader className='loader_container' />}
      {error && <Message className='danger'>{error}</Message>}
      {cellphones && (
        <>
          <CellSort />
          <div className='product_list'>
            {cellphones.map((data) => (
              <div key={data._id} className='list_items'>
                <Card data={data} route={'cellphones'} />
              </div>
            ))}
          </div>
          <PaginateProduct
            pages={pages}
            keyword={keyword ? keyword : ''}
            brand={brand ? brand : ''}
            route={'cellphones'}
          />
        </>
      )}
    </>
  )
}

export default CellPhonePage
