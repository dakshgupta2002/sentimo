import React from 'react'
import { useEffect } from 'react';
import { Sidebar } from '../../components'
import { useDate } from "../../utils/hooks/useDate";
import { fetchStats } from "../../utils/api/stats";

export default function Statistics() {
  const [date, setDate, reset, previous, next, today] = useDate();
  
  useEffect( () => {
    const res = fetchStats(date);
    if (res?.response?.status === 200){
      console.log(res?.data);
    }else{
      console.log(res?.data?.msg);
    }
  }, [date]);

  return (
    <div>
      <Sidebar />

    </div>
  )
}
