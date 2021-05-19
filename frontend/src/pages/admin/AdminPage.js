import React from 'react'
import { Link } from 'react-router-dom'
import Meta from '../../components/Meta'

const AdminPage = () => {
  return (
    <div className='admin_container'>
      <Meta title={"Admin's Home Page"} />
      <Link className='box' to='/admin/users'>
        <i className='fas fa-users-cog'></i>
        <span>Users</span>
      </Link>
      <Link className='box' to='/admin/products'>
        <i className='fas fa-box'></i>
        <span>Products</span>
      </Link>
      <Link className='box' to='/admin/orders'>
        <i className='fas fa-cash-register'></i>
        <span>Orders</span>
      </Link>
    </div>
  )
}

export default AdminPage
