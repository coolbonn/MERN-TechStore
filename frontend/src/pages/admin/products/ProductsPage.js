import React from 'react'
import { Link } from 'react-router-dom'

const ProductPage = () => {
  return (
    <>
      <Link to='/admin' className='go_back'>
        <i className='fas fa-arrow-circle-left'></i>
      </Link>
      <div className='product_container'>
        <Link className='box' to='/admin/product/cells'>
          <i className='fas fa-mobile-alt'></i>
          <span>Cell Phones</span>
        </Link>
        <Link className='box' to='/admin/product/tvs'>
          <i className='fas fa-tv'></i>
          <span>TVs</span>
        </Link>
        <Link className='box' to='/admin/product/computers'>
          <i className='fas fa-laptop'></i>
          <span>Computers</span>
        </Link>
        <Link className='box' to='/admin/product/accessories'>
          <i className='fas fa-headphones-alt'></i>
          <span>Accessories</span>
        </Link>
      </div>
    </>
  )
}

export default ProductPage
