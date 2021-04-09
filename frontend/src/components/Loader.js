import React from 'react'

const Loader = ({ className }) => {
  return (
    <div className={`${className}`}>
      <div className='loader'>
        <span></span>
      </div>
    </div>
  )
}

Loader.defaultProps = {
  className: 'loader_container',
}

export default Loader
