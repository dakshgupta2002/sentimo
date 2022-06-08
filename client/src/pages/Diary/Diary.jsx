import React from 'react'
import { useDate } from '../../utils/hooks/useDate'

export default function Diary() {
  const date = useDate()[0];

  return (
    <div>
      hello diary
      <h2>Date is : {date}</h2>
    </div>
  )
}
