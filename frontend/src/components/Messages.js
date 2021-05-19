import React from 'react'

import { useSpring, animated } from 'react-spring'

export const PopAlert = ({ text, close }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <animated.div style={styles}>
      <div className='popalert_container' onClick={close}>
        <div className='popalert_box'>
          <i className='fas fa-times' onClick={close}></i>
          <h4>{text}</h4>
        </div>
      </div>
    </animated.div>
  )
}

export const AlertMessage = ({ text, btnTxt, onCancel, onDelete }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  return (
    <>
      <animated.div style={styles}>
        <div className='alertMsg_background'>
          <div className='alertMsg_container'>
            <div className='body'>
              <p>{text}</p>
            </div>
            <div className='action'>
              <button onClick={onCancel} className='cancel'>
                Cancel
              </button>
              <button onClick={onDelete} className='delete'>
                {btnTxt}
              </button>
            </div>
          </div>
        </div>
      </animated.div>
    </>
  )
}

export const Message = ({ children, className }) => {
  return <div className={`${className}`}>{children}</div>
}

Message.defaultProps = {
  className: 'success',
}

export const ContentMessage = ({ products, contentMsgClass, text }) => {
  return (
    <>
      {products && products.length === 0 && (
        <div className={`${contentMsgClass}`}>
          <h3>{text}</h3>
        </div>
      )}
    </>
  )
}

ContentMessage.defaultProps = {
  contentMsgClass: 'info',
}

export const TechDif = () => {
  return (
    <>
      <div className='tech_dif'>
        <img
          src={
            'https://am3pap006files.storage.live.com/y4m6al9MeTcSofoiQFvcPrK7DFCZ3s0d2gsfRUlz9cnBLJl0_HnGL8bvDNcw_kcd3QQ-Eyu6GCfdC8L4ktSUwXSzaTfRkePLS9rE_oyXzA_EuxqdZgD7wQ9bWI6Y9h8Wbwy9CcakckceNwtk4Q13hJJ274Y7pErSu9z1K0ptk1GjZubIhZWSzAhPGdMFrccRpNI?width=852&height=480&cropmode=none'
          }
          alt='Technical Difficulties'
        />
      </div>
    </>
  )
}
