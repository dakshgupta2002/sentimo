import React, { useState } from "react";
import { useEffect } from "react";
import { Sidebar } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import { fetchStats } from "../../utils/api/stats";
import { Tab, Tabs } from "@mui/material";
import { TabPanel } from "../../elements/TabPanel";
// import { VictoryGraph}
export default function Statistics() {
  const { date } = useDate();
  const [tab, setTab] = useState(0);
  const numOfDays = [7, 30, 365];
  const [emotions, setEmotions] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  // fetch the statistics created from past days
  useEffect(() => {
    const getStats = async () => {
      const res = await fetchStats(date, numOfDays[tab]);
      if (res?.response?.status === 201 || res?.response?.status === 200) {
        //clear and update the emotions array
        const updatedEmotion = [];
        res?.data?.map((e) => {
          updatedEmotion.push([e.date, e.emotion]);
          return e;
        });
        setEmotions(updatedEmotion);
        console.log(updatedEmotion[0])
      } else {
        console.log(res?.data?.msg);
      }
    };
    getStats();
  }, [date, tab]);

  useEffect( () => {
    const refreshLineData = () => {

    }


    refreshLineData();
  }, [emotions]) // update the data required when new emotions are created

  return (
    <div>
      <Sidebar />
      <Tabs variant="scrollable" value={tab} onChange={handleChange}>
        <Tab label="Last Week" />
        <Tab label="Last Month" />
        <Tab label="Last Year" />
      </Tabs>
      {emotions?.length===0 ? 
        <h1>No emotions fetched... </h1> :
        <div>
          {emotions.map((emote, i) => {
            return (<div key={i}>
              <h2>{emote[0]}</h2>
              <h6>Happy, Sad, Surprise, Angry, Fear</h6>
              <h5>{emote[1].Happy}, {emote[1].Sad} {emote[1].Surprise}, {emote[1].Angry}, {emote[1].Fear}</h5>
              <hr/>
            </div>
            )
          })}
        </div>
      }
    </div>
  );
}
