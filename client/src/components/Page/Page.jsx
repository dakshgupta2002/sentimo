//each individual Page comprises of Notes
//each Page will be shown as it is in a Carousel

import React from 'react'
import {post} from './../../utils/api/post.js'
import Notes from './Notes.jsx'

export default function Page() {
    //fetch notes of current date

  // const response = post("/notes");

  // Temporary jugaad
  const response = 
  [
    {
      title: "title-1",
      content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed doloremque, consequatur cupiditate optio exercitationem quaerat, id soluta a iste laborum distinctio voluptatem voluptatibus labore dolorum qui temporibus minus quas, nulla eum. Dolore ipsa dolor recusandae nemo aliquid explicabo eos perferendis iusto eius vitae magni, corporis voluptates illo? Porro laboriosam nam doloremque, nesciunt fugit sed accusantium tempora?" 
    },
  ]
  return (
    <div>
      {response.map(({title, content}) => {
        return <Notes title = {title} content = {content} />
      })}
      
    </div>
  )
}
