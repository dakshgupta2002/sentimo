import React from 'react'
import './Notes.css'

export default function Notes({title, content}) {
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
