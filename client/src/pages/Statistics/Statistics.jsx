import React, { useState } from "react";
import { useEffect } from "react";
import { Sidebar } from "../../components";
import { useDate } from "../../utils/hooks/useDate";
import { fetchStats } from "../../utils/api/stats";
import { Tab, Tabs } from "@mui/material";
import { TabPanel } from "../../elements/TabPanel";
import { VictoryChart, VictoryLine, VictoryPie, VictoryTheme } from "victory";

export default function Statistics() {
  const { date } = useDate();
  const [tab, setTab] = useState(0);
  const numOfDays = [7, 30, 365];
  const [emotions, setEmotions] = useState(
    []
  ); /* Emotions of last `tab` days */
  const [pieChartData, setPieChartData] = useState([]);

  /* [HappyData, AngryData, Surprise, Sad, Fear]: each ele is an array containing array of objects 
     [ [{x: 1, y: 2}, {x: 3, y: 4}], [{x: 1, y: 2}, {x: 3, y: 4}] ]
  */
  const [lineChartData, setLineChartData] = useState([]);

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
        console.log(updatedEmotion[0]);
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
        lineSurpriseData = [];
      var lineSadData = [],
        lineFearData = [];

      var lineData = [];

      for (let i = 0; i < emotions?.length; i++) {
        /* TODO: What if emotions[1] is empty or some bug do ask Daksh don't forget! */
        var emotion = emotions[1];

        emotion.Happy
          ? lineHappyData.push(Math.round(emotion.Happy * 10))
          : lineHappyData.push(0);
        emotion.Angry
          ? lineAngryData.push(Math.round(emotion.Angry * 10))
          : lineAngryData.push(0);
        emotion.Surprise
          ? lineSurpriseData.push(Math.round(emotion.Surprise * 10))
          : lineSurpriseData.push(0);
        emotion.Sad
          ? lineSadData.push(Math.round(emotion.Sad * 10))
          : lineSadData.push(0);
        emotion.Fear
          ? lineFearData.push(Math.round(emotion.Fear * 10))
          : lineFearData.push(0);
      }

      /* Since all line(some)Data is of same length */
      for (let i = 0; i < lineHappyData?.length; i++) {
        if (lineHappyData[i] !== 0)
          lineData[0].push({ x: i, y: lineHappyData[i] });
        if (lineAngryData[i] !== 0)
          lineData[1].push({ x: i, y: lineAngryData[i] });
        if (lineSurpriseData[i] !== 0)
          lineData[2].push({ x: i, y: lineSurpriseData[i] });
        if (lineSadData[i] !== 0) lineData[3].push({ x: i, y: lineSadData[i] });
        if (lineFearData[i] !== 0)
          lineData[4].push({ x: i, y: lineFearData[i] });
      }

      setLineChartData(lineData);
    };

    /* Get all notes data from emotions and then push it in data vector */
    const refreshPieData = () => {
      var data = [0, 0, 0, 0, 0];
      var totalCount = [1.0, 1.0, 1.0, 1.0, 1.0];

      for (let i = 0; i < emotions?.length; i++) {
        var emotion = emotions[1];
        if (emotion.Happy) {
          data[0] += emotion.Happy;
          totalCount[0] += 1;
        }
        if (emotion.Angry) {
          data[1] += emotion.Angry;
          totalCount[1] += 1;
        }
        if (emotion.Suprise) {
          data[2] += emotion.Suprise;
          totalCount[2] += 1;
        }
        if (emotion.Sad) {
          data[3] += emotion.Sad;
          totalCount[3] += 1;
        }
        if (emotion.Fear) {
          data[4] += emotion.Fear;
          totalCount[4] += 1;
        }
      }

      var pieData = [];
      pieData.push({
        x: "Happy",
        y: Math.round((data[0] / totalCount[0]) * 360),
      });
      pieData.push({
        x: "Angry",
        y: Math.round((data[1] / totalCount[1]) * 360),
      });
      pieData.push({
        x: "Surprise",
        y: Math.round((data[2] / totalCount[2]) * 360),
      });
      pieData.push({
        x: "Sad",
        y: Math.round((data[3] / totalCount[3]) * 360),
      });
      pieData.push({
        x: "Fear",
        y: Math.round((data[4] / totalCount[4]) * 360),
      });

      if (pieData[0].y + pieData[1].y + pieData[2].y + pieData[3].y + pieData[4].y !== 0)
        setPieChartData(pieData);

      // console.log("pieData:", pieData[0].y + pieData[1].y + pieData[2].y + pieData[3].y + pieData[4].y)
    };

    refreshPieData();
    refreshLineData();
  }, [emotions]); // update the data required when new emotions are created

  return (
    <div>
      <Sidebar />
      <Tabs variant="scrollable" value={tab} onChange={handleChange}>
        <Tab label="Last Week" />
        <Tab label="Last Month" />
        <Tab label="Last Year" />
      </Tabs>

      {/* Last 7 Days */}
      <TabPanel value={tab} index={0}>
        <VictoryChart theme={VictoryTheme.material}>
          
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
            data={[]} /* No graphs when Empty Array TODO */
          />
        </VictoryChart>
        
        {pieChartData.length
        ? <VictoryPie
              theme={VictoryTheme.material}
              height={200}
              radius={({ datum }) => 40 + datum.y / 10}
              innerRadius={10}
              data={pieChartData}
              style={{ labels: { fontSize: 5, fontWeight: "bold" } }}
              labels={({ datum }) => `${datum.x}: ${datum.y}`}
            />
        : <h2>NO PIE DATA</h2>
        }

      </TabPanel>
      
      {/* Last 1 Month */}
      <TabPanel value={tab} index={1}>

        <VictoryChart theme={VictoryTheme.material} width={400} height={400}>
          <VictoryLine
            
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
            data={lineChartData[0]} /* This should be empty graph.. TODO */
          />
        </VictoryChart>

      </TabPanel>

      {/* Last 1 Year */}
      <TabPanel value={tab} index={2}>

        <VictoryChart theme={VictoryTheme.material}>
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px solid #ccc" },
            }}
            data={lineChartData[0]} 
          />
        </VictoryChart>

      </TabPanel>

      {emotions?.length === 0 ? (
        <h1>No emotions fetched... </h1>
      ) : (
        <div>
          
          {emotions.map((emote, i) => {
            return (
              <div key={i}>
                <h2>{emote[0]}</h2>
                <h6>Happy, Sad, Surprise, Angry, Fear</h6>
                <h5>
                  {emote[1].Happy}, {emote[1].Sad} {emote[1].Surprise},{" "}
                  {emote[1].Angry}, {emote[1].Fear}
                </h5>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
