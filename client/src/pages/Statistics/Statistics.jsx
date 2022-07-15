import React, { useState } from "react";
import { useEffect } from "react";
import { Sidebar } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import { fetchStats } from "../../utils/api/stats";
import { Tab, Tabs } from "@mui/material";
import {
  VictoryChart,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryAxis,
} from "victory";
import { useLoading } from "../../utils/hooks/useLoading";
import { max } from "moment";
import "./index.css";

export default function Statistics() {
  const { date } = useDate();
  const [tab, setTab] = useState(0);
  const numOfDays = [7, 30, 365];
  const [emotions, setEmotions] = useState(
    []
  ); /* Emotions of last `tab` days */
  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [lineTickData, setLineTickData] = useState([]); // same for all line chart not neeeded in pie
  const { setLoading, setError, LoadingScreen } = useLoading();

  const VictoryEmotionChart = ({ data, label }) => {
    return (
      <div className="victoryLine">
        <VictoryChart
          domain={{ x: [0, numOfDays[tab]], y: [0, 100] }}
          theme={VictoryTheme.material}
        >
          <VictoryAxis
            tickValues={[...Array(lineTickData.length).keys()]} // [0, 1, ..., n - 1]
            tickFormat={lineTickData} // First two label rest empty
            label={label}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => `${Math.round(tick)}`}
          />
          <VictoryLine data={data} />
        </VictoryChart>
      </div>
    );
  };
  // fetch the statistics created from past days
  useEffect(() => {
    const getStats = async () => {
      setLoading(true);
      setError("Fetching the stats");
      const res = await fetchStats(date, numOfDays[tab]);
      if (res?.response?.status === 201 || res?.response?.status === 200) {
        //clear and update the emotions array
        const updatedEmotion = [];
        res?.data?.map((e) => {
          updatedEmotion.push([e.date, e.emotion]);
          return e;
        });
        setEmotions(updatedEmotion);
      } else {
        console.log(res?.data?.msg);
      }
    };
    getStats();
  }, [date, tab]);

  useEffect(() => {
    /* Score out of 10 for each day and each emotion separate line chart */
    const refreshLineData = () => {
      var lineHappyData = [],
        lineAngryData = [],
        lineSurpriseData = [],
        lineSadData = [],
        lineFearData = [],
        lineDateData = [];

      for (let i = 0; i < emotions?.length; i++) {
        let emotion = emotions[i][1]; //emotions of each day are stored in index 1

        lineDateData.push(emotions[i][0]);
        emotion.Happy
          ? lineHappyData.push(Math.round(emotion.Happy * 100))
          : lineHappyData.push(0);
        emotion.Angry
          ? lineAngryData.push(Math.round(emotion.Angry * 100))
          : lineAngryData.push(0);
        emotion.Surprise
          ? lineSurpriseData.push(Math.round(emotion.Surprise * 100))
          : lineSurpriseData.push(0);
        emotion.Sad
          ? lineSadData.push(Math.round(emotion.Sad * 100))
          : lineSadData.push(0);
        emotion.Fear
          ? lineFearData.push(Math.round(emotion.Fear * 100))
          : lineFearData.push(0);
      }

      for (let i = 1; i < lineDateData.length - 1; i++) {
        lineDateData[i] = "";
      }

      var lineData = [];
      for (let i = 0; i < 5; i++) lineData.push([]);

      for (let i = 0; i < lineHappyData?.length; i++) {
        lineData[0].push({ x: i, y: lineHappyData[i] });
        lineData[1].push({ x: i, y: lineAngryData[i] });
        lineData[2].push({ x: i, y: lineSurpriseData[i] });
        lineData[3].push({ x: i, y: lineSadData[i] });
        lineData[4].push({ x: i, y: lineFearData[i] });
      }
      setLineChartData(lineData);
    };

    /* Get all notes data from emotions and then push it in data vector */
    const refreshPieData = () => {
      var data = [0, 0, 0, 0, 0];
      var totalCount = 0;

      for (let i = 0; i < emotions?.length; i++) {
        let emotion = emotions[i][1];
        data[0] += emotion.Happy;
        data[1] += emotion.Angry;
        data[2] += emotion.Surprise;
        data[3] += emotion.Sad;
        data[4] += emotion.Fear;
        totalCount += 1;
      }
      for (let i = 0; i < 5; i++) {
        data[i] = Math.round((data[i] / totalCount) * 100);
      }
      var pieData = [];
      if (data[0])
        pieData.push({
          x: "Happy",
          y: Math.round(data[0]),
        });
      if (data[1])
        pieData.push({
          x: "Angry",
          y: Math.round(data[1]),
        });
      if (data[2])
        pieData.push({
          x: "Surprise",
          y: Math.round(data[2]),
        });
      if (data[3])
        pieData.push({
          x: "Sad",
          y: Math.round(data[3]),
        });
      if (data[4])
        pieData.push({
          x: "Fear",
          y: Math.round(data[4]),
        });

      setPieChartData(pieData);
    };

    refreshPieData();
    refreshLineData();
    setLoading(false);
  }, [emotions]); // update the data required when new emotions are created

  return (
    <div>
      <Sidebar />
      <LoadingScreen />
      <Tabs
        variant="scrollable"
        value={tab}
        onChange={(e, newTab) => setTab(newTab)}
      >
        <Tab label="Last Week" />
        <Tab label="Last Month" />
        <Tab label="Last Year" />
      </Tabs>

      {emotions?.length === 0 ? (
        <h1 className="nofetch__header">No emotions fetched... </h1>
      ) : (
        <div>
          <div className="lineChartContainer">
            <VictoryEmotionChart data={lineChartData[0]} label="Happy" />
            <VictoryEmotionChart data={lineChartData[1]} label="Angry" />
            <VictoryEmotionChart data={lineChartData[2]} label="Surprise" />
            <VictoryEmotionChart data={lineChartData[3]} label="Sad" />
            <VictoryEmotionChart data={lineChartData[4]} label="Fear" />
          </div>

          <VictoryPie
            theme={VictoryTheme.material}
            height={200}
            radius={({ datum }) => 30 + datum.y / 10}
            innerRadius={10}
            data={pieChartData}
            style={{ labels: { fontSize: 5, fontWeight: "bold" } }}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
          />
        </div>
      )}
    </div>
  );
}
