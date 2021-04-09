import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const ProductSort = ({ route }) => {
  const [sortBy, setSortBy] = useState('')
  const [brand, setBrand] = useState('')
  const [keyword, setKeyword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (sortBy) {
      history.push(`/${route}/sort/${sortBy}`)
    } else if (sortBy === 'none') {
      history.push(`/${route}`)
    }
  }, [history, sortBy])

  useEffect(() => {
    if (brand) {
      history.push(`/${route}/brand/${brand}`)
    } else if (brand === '') {
      history.push(`/${route}`)
    }
  }, [history, brand])

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/${route}/search/${keyword}`)
      setKeyword('')
    } else {
      history.push(`/${route}`)
    }
  }

  return (
    <div className='sort_container'>
      <div className='col_1'>
        <label>Sort By</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value='none'>None</option>
          <option value='yearasc'>Year asc</option>
          <option value='yeardesc'>Year desc</option>
          <option value='priceasc'>Price asc</option>
          <option value='pricedesc'>Price desc</option>
          <option value='oldest'>Oldest</option>
        </select>
        <span>
          <i className='fas fa-ellipsis-v'></i>
        </span>
        <label>Brand</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value=''>All</option>
          <option value='huawei'>Huawei</option>
          <option value='samsung'>Samsung</option>
          <option value='sony'>Sony</option>
          <option value='tcl'>TCL</option>
          <option value='philips'>Philips</option>
          <option value='apple'>Apple</option>
          <option value='nokia'>Nokia</option>
          <option value='lg'>LG</option>
        </select>
      </div>

      <form onSubmit={submitHandler}>
        <div className='col_2'>
          <input
            type='text'
            name='q'
            placeholder='Search Product'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type='submit'>Search</button>
        </div>
      </form>
    </div>
  )
}

export default ProductSort
