import { Button } from '@mui/material';
import React from 'react'
import { useDate } from '../../utils/hooks/useDate'

export default function Diary() {
  const [date, setDate, reset, previous, next] = useDate();

  return (
    <div>
      hello diary
      <h2>Date is : {date}</h2>
      <Button onClick = {() => {previous()}}>
        Previous
      </Button> 

      <Button onClick = {() => {next()}}>
        Next
      </Button> 

      <Button onClick = {() => {reset()}}>
        Reset
      </Button> 
    </div>
  )
}
