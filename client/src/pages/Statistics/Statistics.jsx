import React, { useState} from "react";
import { useEffect } from "react";
import { Sidebar } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import { fetchStats } from "../../utils/api/stats";
import { Tab, Tabs } from "@mui/material";
import { TabPanel } from "../../elements/TabPanel";

export default function Statistics() {
  const { date } = useDate();
  const [tab, setTab] = useState(0);
  const [pieChartData, setPieChartData] = useState([]);
  const numOfDays = [7, 30, 365]
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  //recommendation is major here
  useEffect(() => {
    const getStats = async () => {
      const res = await fetchStats(date, numOfDays[tab]);
      console.log(res);
      if (res?.response?.status === 201 || res?.response?.status === 200) {
        console.log(res?.data?.emotion);
      } else {
        console.log(res?.data?.msg);
      }
    }

    getStats();
  }, [date, tab]);

  return (
    <div>
      <Sidebar />
      <Tabs variant="scrollable" value={tab} onChange={handleChange}>
        <Tab label="Last Week" />
        <Tab label="Last Month" />
        <Tab label="Last Year" />
      </Tabs>

    </div>
  );
}
