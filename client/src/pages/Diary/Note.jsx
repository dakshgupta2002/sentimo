import React from 'react'
import './Diary.css'

export default function Note({title, content}) {
  return (
    <div>
      <div className='title-container'>
        TITLE: {title}
      </div>
      <div className='content-container'>
        CONTENT: {content}
      </div>
    </div>
  )
}
