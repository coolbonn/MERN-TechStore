import React from 'react'
import { useHistory } from 'react-router-dom'

const GoBack = () => {
  const history = useHistory()

  const goBackHandler = () => {
    history.goBack()
  }

  return (
    <span className='go_back' onClick={goBackHandler}>
      <i className='fas fa-arrow-circle-left'></i>
    </span>
  )
}

export default GoBack
