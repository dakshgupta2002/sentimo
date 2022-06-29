import React from "react";
import { useEffect } from "react";
import { Sidebar } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import { fetchStats } from "../../utils/api/stats";
import { Tab, Tabs } from "@mui/material";
import { TabPanel } from "../../elements/TabPanel";

export default function Statistics() {
  const { date } = useDate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //recommendation is major here
  useEffect(() => {
    const res = fetchStats(date);
    console.log(res);
    if (res?.response?.status === 201 || res?.response?.status === 200) {
      console.log(res?.data?.emotion);
    } else {
      console.log(res?.data?.msg);
    }
  }, [date]);

  return (
    <div>
      <Sidebar />
      <Tabs variant="scrollable" value={value} onChange={handleChange}>
        <Tab label="Last Week" />
        <Tab label="Last Month" />
        <Tab label="Last Year" />
      </Tabs>

      <TabPanel value={value} index={0}>
        Stats for last Week
      </TabPanel>

      <TabPanel value={value} index={1}>
        Stats for Last Month
      </TabPanel>

      <TabPanel value={value} index={2}>
        Stats for Last Year
      </TabPanel>
    </div>
  );
}
