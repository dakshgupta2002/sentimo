import React from 'react'

export default function InputDate({date, setDate}) {
  return (
    <span>{`${date.toLocaleDateString()}`}</span>
  )
}
