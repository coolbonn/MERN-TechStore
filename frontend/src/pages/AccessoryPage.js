import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accessoriesList } from '../actions/accessoryActions'
import Card from '../components/Card'
import Loader from '../components/Loader'
import { ContentMessage, Message } from '../components/Messages'
import { AccessorySort } from '../components/ProductSort'
import { PaginateProduct } from '../components/Paginate'
import Meta from '../components/Meta'

const AccessoryPage = ({ match }) => {
  const sortBy = match.params.sortBy
  const brand = match.params.brand
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const accList = useSelector((state) => state.accessories)
  const { loading, error, accessories, pages } = accList
  console.log(accessories)

  useEffect(() => {
    dispatch(accessoriesList(sortBy, brand, keyword, pageNumber))
  }, [dispatch, sortBy, brand, keyword, pageNumber])

  return (
    <>
      <ContentMessage
        products={accessories}
        contentMsgClass={loading ? 'empty' : 'info'}
        text={'No Products!'}
      />
      <Meta
        title={'Accessories'}
        content={'Choose accessories that fit your needs'}
      />
      {loading && <Loader className='loader_container' />}
      {error && <Message className='danger'>{error}</Message>}
      {accessories && (
        <>
          <AccessorySort />
          <div className='product_list'>
            {accessories.map((data) => (
              <div key={data._id} className='list_items'>
                <Card data={data} route={'accessories'} />
              </div>
            ))}
          </div>
          <PaginateProduct
            pages={pages}
            keyword={keyword ? keyword : ''}
            brand={brand ? brand : ''}
            route={'accessories'}
          />
        </>
      )}
    </>
  )
}

export default AccessoryPage
