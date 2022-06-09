import React from 'react'
import './Page.css'

export default function Note({title, content}) {
  return (
    <div>
      <div className='title-container'>
        {title}
      </div>
      <div className='content-container'>
        {content}
      </div>
    </div>
  )
}
