import React, { useEffect, useState } from 'react'
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
          sx={{border: 'none', fontSize: '2rem'}}
          inputFormat="DD/MM/YYYY"
          className='datePickerForDiary'
          value={date}
          onChange={(e) => setDate(new Date(e?._d))}
          renderInput={(params) => <TextField className='date' {...params} />}
        />
      </LocalizationProvider>
    </div>
  )
}
