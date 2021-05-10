import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const CellSort = () => {
  const [sortBy, setSortBy] = useState('')
  const [brand, setBrand] = useState('')
  const [keyword, setKeyword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (sortBy) {
      history.push(`/cellphones/sort/${sortBy}`)
    } else if (sortBy === 'none') {
      history.push(`/cellphones`)
    }
  }, [history, sortBy])

  useEffect(() => {
    if (brand) {
      history.push(`/cellphones/brand/${brand}`)
    } else if (brand === '') {
      history.push(`/cellphones`)
    }
  }, [history, brand])

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/cellphones/search/${keyword}`)
      setKeyword('')
    } else {
      history.push(`/cellphones`)
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

export const TvSort = () => {
  const [sortBy, setSortBy] = useState('')
  const [brand, setBrand] = useState('')
  const [keyword, setKeyword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (sortBy) {
      history.push(`/tvs/sort/${sortBy}`)
    } else if (sortBy === 'none') {
      history.push(`/tvs`)
    }
  }, [history, sortBy])

  useEffect(() => {
    if (brand) {
      history.push(`/tvs/brand/${brand}`)
    } else if (brand === '') {
      history.push(`/tvs`)
    }
  }, [history, brand])

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/tvs/search/${keyword}`)
      setKeyword('')
    } else {
      history.push(`/tvs`)
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
          <option value='samsung'>Samsung</option>
          <option value='sony'>Sony</option>
          <option value='tcl'>TCL</option>
          <option value='philips'>Philips</option>
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

export const ComputerSort = () => {
  const [sortBy, setSortBy] = useState('')
  const [brand, setBrand] = useState('')
  const [keyword, setKeyword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (sortBy) {
      history.push(`/computers/sort/${sortBy}`)
    } else if (sortBy === 'none') {
      history.push(`/computers`)
    }
  }, [history, sortBy])

  useEffect(() => {
    if (brand) {
      history.push(`/computers/brand/${brand}`)
    } else if (brand === '') {
      history.push(`/computers`)
    }
  }, [history, brand])

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/computers/search/${keyword}`)
      setKeyword('')
    } else {
      history.push(`/computers`)
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
          <option value='asus'>Asus</option>
          <option value='hp'>HP</option>
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

export const AccessorySort = () => {
  const [sortBy, setSortBy] = useState('')
  const [brand, setBrand] = useState('')
  const [keyword, setKeyword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (sortBy) {
      history.push(`/accessories/sort/${sortBy}`)
    } else if (sortBy === 'none') {
      history.push(`/accessories`)
    }
  }, [history, sortBy])

  useEffect(() => {
    if (brand) {
      history.push(`/accessories/brand/${brand}`)
    } else if (brand === '') {
      history.push(`/accessories`)
    }
  }, [history, brand])

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/accessories/search/${keyword}`)
      setKeyword('')
    } else {
      history.push(`/accessories`)
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
        <label>Type</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value=''>All</option>
          <option value='tempered glass'>Tempered Glass</option>
          <option value='selfie stick'>Selfie Stick</option>
          <option value='car charger'>Car Charger</option>
          <option value='usb connecting cable'>USB Connecting Cable</option>
          <option value='portable charger'>Portable Charger</option>
          <option value='flash drive'>Flash Drive</option>
          <option value='bluetooth mono headset'>Bluetooth Mono Headset</option>
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
