import { Box } from "@mui/material";
import React, { useState } from "react";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchNoteStats } from "../../utils/api/stats";
import { VictoryPie, VictoryAxis, VictoryBar, VictoryChart } from "victory";
import { Cards } from "../../elements";
//fetch stats for particulary only this note Id
//and stats should be converted to graphs and illustrations

export default function NoteStat() {
  const noteId = useParams().noteId;
  const [emotion, setEmotion] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([{"x": "", "y": 0}]);

  useEffect(() => {
    const fetchStat = async () => {
      const res = await fetchNoteStats(noteId);
      if (res?.response?.status === 201 || res?.response?.status === 200) {
        setEmotion(res?.data?.emotion);
        setTitle(res?.data?.title);
        setContent(res?.data?.content);
      } else {
        console.log(res?.data?.msg);
      }
    };

    fetchStat();
  }, []);

  useEffect(() => {
    const refreshPieData = () => {
      const data = [];
      if (emotion.Happy) data.push({ x: "Happy", y: Math.round(emotion?.Happy * 360) });
      if (emotion.Sad) data.push({ x: "Sad", y: Math.round(emotion?.Sad * 360) });
      if (emotion.Angry) data.push({ x: "Angry", y: Math.round(emotion?.Angry * 360) });
      if (emotion.Surprise)
        data.push({ x: "Surprise", y: Math.round(emotion?.Surprise * 360) });
      if (emotion.Fear) data.push({ x: "Fear", y: Math.round(emotion?.Fear * 360) });
      setPieData(data);
    };

    const refreshLineData = () => {
      const data = [];
      if (emotion.Sad) data.push({ x:1 , y: Math.round(emotion?.Sad * 100) });
      if (emotion.Angry) data.push({ x: 2, y: Math.round(emotion?.Angry * 100) });
      if (emotion.Surprise) data.push({ x: 3 , y: Math.round(emotion?.Surprise * 100) });
      if (emotion.Fear) data.push({ x: 4, y: Math.round(emotion?.Fear * 100) });
      if (emotion.Happy) data.push({ x:5 , y: Math.round(emotion?.Happy * 100) });
      setLineData(data);
    }
    console.log(lineData);

    refreshPieData();
    refreshLineData();
  }, [emotion]);

  return (
    <Box>
      <Sidebar />
      <VictoryPie
        height={200}
        radius={({ datum }) => 40 + datum.y / 10}
        innerRadius={10}
        data={pieData}
        style={{ labels: { fontSize: 5, fontWeight: "bold" } }}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
      />  

      <VictoryChart domainPadding={20} height={200}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={["Sad", "Angry", "Surprise", "Fear", "Happy"]}
        />
        <VictoryAxis
          height={300}
          dependentAxis
          tickFormat={(x) => (x)}
        />
        <VictoryBar
          data={lineData}
          x="x"
          y="y"
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 }
          }}
        />
      </VictoryChart>


      <Cards noteId={noteId} date={null} time={null} title={title} content={content} favourite={-1} protect={-1} />
      <span>
        <h4>Happy</h4>: {emotion.Happy}{" "}
      </span>{" "}
      <br />
      <span>
        <h4>Sad</h4>: {emotion.Sad}{" "}
      </span>{" "}
      <br />
      <span>
        <h4>Angry</h4>: {emotion.Angry}{" "}
      </span>{" "}
      <br />
      <span>
        <h4>Surprise</h4>: {emotion.Surprise}{" "}
      </span>{" "}
      <br />
      <span>
        <h4>Fear</h4>: {emotion.Fear}{" "}
      </span>{" "}
      <br />
    </Box>
  );
}
