import React, { useState } from 'react'
import { PopAlert } from './Messages'

const TechDetails = ({
  data,
  qty,
  setQty,
  addToCartHandler,
  message,
  noMessage,
}) => {
  const [displayImage, setDisplayImage] = useState(data.image)

  return (
    <>
      {data && (
        <div className='detail_grid'>
          <div className='row_1'>
            <div className='col_1'>
              <img
                src={displayImage ? displayImage : data.image}
                alt={data.name}
              />
            </div>
            <div className='col_2'>
              <img
                src={data.image}
                alt={data.name}
                onClick={() => setDisplayImage(data.image)}
              />
              <img
                src={data.altImage1}
                alt={data.name}
                onClick={() => setDisplayImage(data.altImage1)}
              />
              <img
                src={data.altImage2}
                alt={data.name}
                onClick={() => setDisplayImage(data.altImage2)}
              />
              <img
                src={data.altImage3}
                alt={data.name}
                onClick={() => setDisplayImage(data.altImage3)}
              />
              <img
                src={data.altImage4}
                alt={data.name}
                onClick={() => setDisplayImage(data.altImage4)}
              />
            </div>
          </div>
          <div className='row_2'>
            <div className='col_1'>
              <h4 className='items'>${data.price}</h4>
              <h4 className='items'>
                {' '}
                {data.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </h4>
              {data.countInStock > 0 && (
                <div className='items'>
                  <b>Quantity:</b>{' '}
                  <select
                    name='quantity'
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(data.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {message && (
                <PopAlert
                  close={noMessage}
                  text={'You Must Be Logged In to Add to Cart!'}
                />
              )}
              <button
                className='items'
                onClick={addToCartHandler}
                disabled={data.countInStock === 0}
              >
                Add To Cart
              </button>
            </div>
            <div className='col_2'>
              <h2 className='items'>{data.brand}</h2>
              <h3 className='items'>{data.name}</h3>
              <h4 className='items'>{data.year}</h4>
              <p className='items'>{data.specs}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TechDetails
