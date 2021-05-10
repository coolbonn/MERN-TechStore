import React from 'react'
import Loader from './Loader'

const ProductInput = ({
  name,
  setName,
  brand,
  setBrand,
  specs,
  setSpecs,
  year,
  setYear,
  price,
  setPrice,
  countInStock,
  setCountInStock,
  image,
  setImage,
  altImage1,
  setAltImage1,
  altImage2,
  setAltImage2,
  altImage3,
  setAltImage3,
  altImage4,
  setAltImage4,
  uploadFileHandler,
  uploadFile1Handler,
  uploadFile2Handler,
  uploadFile3Handler,
  uploadFile4Handler,
  uploading,
  text,
}) => {
  return (
    <>
      <div className='col_1'>
        <label>Name</label>
        <input
          type='text'
          placeholder='Enter Product Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Brand</label>
        <input
          type='text'
          placeholder='Enter Product Model'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <label>Specs</label>
        <input
          type='text'
          placeholder='Enter Product Specs'
          value={specs}
          onChange={(e) => setSpecs(e.target.value)}
        />

        <label>Year</label>
        <input
          type='number'
          placeholder='Enter Product Year'
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <label>Price</label>
        <input
          type='number'
          placeholder='Enter Product Price'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Count In Stock</label>
        <input
          type='number'
          placeholder='Enter Product Quantity'
          value={countInStock}
          onChange={(e) => setCountInStock(e.target.value)}
        />
      </div>

      {/* upload images */}

      <div className='col_2'>
        <label>Image</label>
        <input
          type='text'
          placeholder='Enter Image Url'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label>Image</label>
        <input
          type='file'
          placeholder='Upload Product Image'
          onChange={uploadFileHandler}
        />

        <label>Alt Image 1</label>
        <input
          type='text'
          placeholder='Enter Image Url'
          value={altImage1}
          onChange={(e) => setAltImage1(e.target.value)}
        />
        <label>Alt Image 1</label>
        <input
          type='file'
          placeholder='Upload Product Alt Image 1'
          onChange={uploadFile1Handler}
        />

        <label>Alt Image 2</label>
        <input
          type='text'
          placeholder='Enter Image Url'
          value={altImage2}
          onChange={(e) => setAltImage2(e.target.value)}
        />
        <label>Alt Image 2</label>
        <input
          type='file'
          placeholder='Upload Product Alt Image 2'
          onChange={uploadFile2Handler}
        />
      </div>
      <div className='col_3'>
        <label>Alt Image 3</label>
        <input
          type='text'
          placeholder='Enter Image Url'
          value={altImage3}
          onChange={(e) => setAltImage3(e.target.value)}
        />
        <label>Alt Image 3</label>
        <input
          type='file'
          placeholder='Upload Product Alt Image 3'
          onChange={uploadFile3Handler}
        />

        <label>Alt Image 4</label>
        <input
          type='text'
          placeholder='Enter Image Url'
          value={altImage4}
          onChange={(e) => setAltImage4(e.target.value)}
        />
        <label>Alt Image 4</label>
        <input
          type='file'
          placeholder='Upload Product Alt Image 4'
          onChange={uploadFile4Handler}
        />

        <button type='submit'>{text}</button>
      </div>
      {uploading && <Loader />}
    </>
  )
}

ProductInput.defaultProps = {
  text: 'Create Product',
}

export default ProductInput
