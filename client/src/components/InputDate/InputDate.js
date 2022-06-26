import React, { useEffect, useState } from 'react'
import './InputDate.css';

export default function InputDate({date, setDate}) {
  const [dd, setdd] = useState(date.getDate());
  const [mm, setmm] = useState(date.getMonth()+1);
  const [yyyy, setyyyy] = useState(date.getFullYear());
  const [invalid, setInvalid] = useState(false);

  const dateIsValid = (date) => {
    return date instanceof Date && !isNaN(date);
  }

  useEffect( () => {
    const date = mm + "/" + dd + "/" + yyyy;
    if (dateIsValid(new Date(date))){
      setDate( new Date(date) );
      setInvalid(false);
    } else{
      setInvalid(true);
    }
  }, [dd, mm, yyyy]);

  return (
    <div className={`calendar ${invalid && "invalid"}`}>
      <input className="unit" value={date.getDate()} onChange={(e)=> setdd(e.target.value)}/>
      <input className="unit" value={date.getMonth()+1} onChange={(e)=> setmm(e.target.value)}/>
      <input className="unit" value={date.getFullYear()} onChange={(e)=> setyyyy(e.target.value)}/>
    </div>
  )
}
