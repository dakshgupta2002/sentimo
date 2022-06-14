import React from 'react'
import { useEffect } from 'react';
import { Sidebar } from '../../components'
import { useDate } from "../../utils/hooks/useDate";
import { fetchStats } from "../../utils/api/stats";

export default function Statistics() {
  const [date] = useDate();
  //recommendation is major here
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
      <h1>Statistics for date</h1>
    </div>
  )
}
