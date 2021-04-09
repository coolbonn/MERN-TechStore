import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ data, route }) => {
  return (
    <>
      <Link to={`/${route}/${data._id}`} style={{ textDecoration: 'none' }}>
        <div className='card'>
          <img
            className='card_img'
            src={data.image}
            style={{ width: '200px' }}
          />
          <div className='card_body'>
            <div className='card_text'>
              <Link className='text text_link' to={`/${route}/${data._id}`}>
                <strong>{data.name}</strong>
              </Link>
              <p className='text'>{data.year}</p>
              <p className='text'>{data.specs}</p>
              <h4 className='text'>${data.price}</h4>
            </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Card
