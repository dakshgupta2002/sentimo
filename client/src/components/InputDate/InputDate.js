import React, { useEffect, useState } from 'react'
import { ModalContainer } from '../ModalContainer';
import { IconButton, TextField } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './InputDate.css';


export default function InputDate({ date, setDate }) {
  return (
    <div >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDatePicker
          className='date'
          inputFormat="DD/MM/YYYY"
          value={date}
          onChange={(e) => setDate(new Date(e?._d))}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <IconButton>
        <div className='calendar'>

          <div className='date'>
            {`${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()} `}

          </div>
          <div className='label'>
            DD MM YYYY
          </div>
        </div>
      </IconButton>
    </div>
  )
}
