import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, content }) => {
  return (
    <Helmet>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='description' content={content} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Tech Store',
  content: 'Amazing Store',
}

export default Meta
