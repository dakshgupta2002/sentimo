//each individual Page comprises of Notes
//each Page will be shown as it is in a Carousel

import React from 'react'
import {post} from './../../utils/api/post.js'

export default function Page() {
    //fetch notes of current date
  const response = post("/notes");
  return (
    <div>Page</div>
  )
}
