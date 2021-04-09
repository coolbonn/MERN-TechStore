import React from 'react'
import { Spring } from 'react-spring/renderprops'

export const PopAlert = ({ children }) => {
  return (
    <Spring
      from={{ opacity: 0, transform: 'scale(0)' }}
      to={{ opacity: 1, transform: 'scale(1)' }}
    >
      {(props) => (
        <div style={props} className='popalert_container'>
          {children}
        </div>
      )}
    </Spring>
  )
}

export const Message = ({ children, className }) => {
  return <div className={`${className}`}>{children}</div>
}

Message.defaultProp = {
  className: 'success',
}
