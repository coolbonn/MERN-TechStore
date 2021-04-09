import React from 'react'
import { NavLink } from 'react-router-dom'

export const PaginateProduct = ({
  pages,
  isAdmin = false,
  keyword = '',
  brand = '',
}) => {
  return (
    pages > 1 && (
      <div className='pagination'>
        {[...Array(pages).keys()].map((x) => (
          <NavLink
            exact
            style={{ textDecoration: 'none' }}
            activeClassName='active'
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/cellphones/search/${keyword}/page/${x + 1}`
                  : brand
                  ? `/cellphones/brand/${brand}/page/${x + 1}`
                  : `/cellphones/page/${x + 1}`
                : `/admin/product/cells/page/${x + 1}`
            }
          >
            <b>{x + 1}</b>
          </NavLink>
        ))}
      </div>
    )
  )
}

export const PaginateUser = ({ pages, isAdmin = false }) => {
  return (
    pages > 1 && (
      <div className='pagination'>
        {[...Array(pages).keys()].map((x) => (
          <NavLink
            style={{ textDecoration: 'none' }}
            activeClassName='active'
            key={x + 1}
            to={isAdmin && `/admin/users/page/${x + 1}`}
          >
            <b>{x + 1}</b>
          </NavLink>
        ))}
      </div>
    )
  )
}
