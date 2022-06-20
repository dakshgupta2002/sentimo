import { Box } from "@mui/material";
import React, { useState } from "react";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchNoteStats } from "../../utils/api/stats";
import {
  VictoryPie,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from "victory";
import { Cards } from "../../elements";

import './index.css';
import { fetchNoteSingle } from "../../utils/api/notes";
//fetch stats for particulary only this note Id
//and stats should be converted to graphs and illustrations

export default function NoteStat() {
  const noteId = useParams().noteId;
  const [emotion, setEmotion] = useState({});
  const [note, setNote] = useState({});
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([{ x: "", y: 0 }]);

  useEffect(() => {
    const fetchStat = async () => {
      const note = await fetchNoteSingle(noteId);
      setNote(note?.data);
      const res = await fetchNoteStats(noteId);
      if (res?.response?.status === 201 || res?.response?.status === 200) {
        setEmotion(res?.data?.emotion);
      } else {
        console.log(res?.data?.msg);
      }
    };

    fetchStat();
  }, []);

  useEffect(() => {
    const refreshPieData = () => {
      const data = [];
      if (emotion.Happy)
        data.push({ x: "Happy", y: Math.round(emotion?.Happy * 360) });
      if (emotion.Sad)
        data.push({ x: "Sad", y: Math.round(emotion?.Sad * 360) });
      if (emotion.Angry)
        data.push({ x: "Angry", y: Math.round(emotion?.Angry * 360) });
      if (emotion.Surprise)
        data.push({ x: "Surprise", y: Math.round(emotion?.Surprise * 360) });
      if (emotion.Fear)
        data.push({ x: "Fear", y: Math.round(emotion?.Fear * 360) });
      setPieData(data);
    };

    const refreshLineData = () => {
      const data = [];
      if (emotion.Sad) data.push({ x: 1, y: Math.round(emotion?.Sad * 360) });
      if (emotion.Angry)
        data.push({ x: 2, y: Math.round(emotion?.Angry * 360) });
      if (emotion.Surprise)
        data.push({ x: 3, y: Math.round(emotion?.Surprise * 360) });
      if (emotion.Fear) data.push({ x: 4, y: Math.round(emotion?.Fear * 360) });
      if (emotion.Happy)
        data.push({ x: 5, y: Math.round(emotion?.Happy * 360) });
      setLineData(data);
    };

    refreshPieData();
    refreshLineData();
  }, [emotion]);

  return (
    <Box>
      <Sidebar />
      <div className="noteInfo">
        <Cards
          noteId={noteId}
          date={new Date(note?.updatedAt).toLocaleDateString()}
          time={new Date(note?.updatedAt).toLocaleTimeString()}
          title={note?.title}
          content={note?.content}
          favourite={-1}
          protect={-1}
          maxwidth={"80vw"}
        />
      </div>
      <VictoryPie
        theme={VictoryTheme.material}
        height={200}
        radius={({ datum }) => 40 + datum.y / 10}
        innerRadius={10}
        data={pieData}
        style={{ labels: { fontSize: 5, fontWeight: "bold" } }}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
      />
      <VictoryChart
        domainPadding={20}
        height={200}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          theme={VictoryTheme.material}
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={["Sad", "Angry", "Surprise", "Fear", "Happy"]}
        />
        <VictoryAxis
          theme={VictoryTheme.material}
          dependentAxis
        />
        <VictoryBar
          theme={VictoryTheme.material}
          data={lineData}
          x="x"
          y="y"
          animate={{
            duration: 200,
            onLoad: { duration: 100 },
          }}
        />
      </VictoryChart>
    </Box>
  );
}
