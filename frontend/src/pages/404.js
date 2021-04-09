import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='error_container'>
      <h1>
        Oops... Looks like something went wrong. This usually happens when
        requested page does not exists or is unauthorized
      </h1>
      <p>
        If problem is from our end, we will fix it shortly.{' '}
        <Link className='link' to='/'>
          Go Back To Home
        </Link>
      </p>
    </div>
  )
}

export default ErrorPage
