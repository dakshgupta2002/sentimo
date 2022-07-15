import { Box, Button, Typography } from "@mui/material";
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

import "./index.css";
import { useLoading } from "../../utils/hooks/useLoading";
import { fetchNoteSingle } from "../../utils/api/notes";
//fetch stats for particulary only this note Id
//and stats should be converted to graphs and illustrations

export default function NoteStat() {
  const noteId = useParams().noteId;
  const [emotion, setEmotion] = useState(null);
  const [note, setNote] = useState({});
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([{ x: "", y: 0 }]);
  const { LoadingScreen, setLoading, setError } = useLoading();

  const fetchEmotion = async () => {
    setLoading(true);
    setError("Generating Stats");
    const res = await fetchNoteStats(noteId);
    if (res?.response?.status === 201 || res?.response?.status === 200) {
      setEmotion(res?.data?.emotion);
    } else {
      console.log(res?.data?.msg);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setError("Fetching Note Data");
      const note = await fetchNoteSingle(noteId);
      if (note?.response?.status === 404) {
        return;
      }
      setNote(note?.data);
      setLoading(false);
    };
    fetchNote();
  }, [noteId]);

  useEffect(() => {
    const refreshPieData = () => {
      const data = [];
      if (emotion?.Happy)
        data.push({ x: "Happy", y: Math.round(emotion?.Happy * 100) });
      if (emotion?.Sad)
        data.push({ x: "Sad", y: Math.round(emotion?.Sad * 100) });
      if (emotion?.Angry)
        data.push({ x: "Angry", y: Math.round(emotion?.Angry * 100) });
      if (emotion?.Surprise)
        data.push({ x: "Surprise", y: Math.round(emotion?.Surprise * 100) });
      if (emotion?.Fear)
        data.push({ x: "Fear", y: Math.round(emotion?.Fear * 100) });
      setPieData(data);
    };

    const refreshLineData = () => {
      const data = [];
      if (emotion?.Sad) data.push({ x: 1, y: Math.round(emotion?.Sad * 100) });
      if (emotion?.Angry)
        data.push({ x: 2, y: Math.round(emotion?.Angry * 100) });
      if (emotion?.Surprise)
        data.push({ x: 3, y: Math.round(emotion?.Surprise * 100) });
      if (emotion?.Fear)
        data.push({ x: 4, y: Math.round(emotion?.Fear * 100) });
      if (emotion?.Happy)
        data.push({ x: 5, y: Math.round(emotion?.Happy * 100) });
      setLineData(data);
    };

    refreshPieData();
    refreshLineData();
  }, [emotion]);

  return (
    <Box>
      <LoadingScreen/>
      <Sidebar />
      <div className="noteInfo">
        <Cards
          noteId={noteId}
          date={new Date(note?.updatedAt).toLocaleDateString("en-GB")}
          time={new Date(note?.updatedAt).toLocaleTimeString("en-GB")}
          title={note?.title}
          content={note?.content}
          favourite={-1}
          protect={-1}
          maxwidth={"700px"}
        >
          <Button
            variant="contained"
            color="secondary"
            size="normal"
            onClick={fetchEmotion}
            // sx={{ margin: "auto" }}
          >
            Generate Stats Now
          </Button>
        </Cards>
      </div>
      {!!emotion === false ? (
        <Typography>..</Typography>
      ) : pieData.length === 0 && lineData.length === 0 ? (
        <Typography>
          Content not sufficient to generate emotions for this note. Try Harder
        </Typography>
      ) : (
        <>
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
            <VictoryAxis theme={VictoryTheme.material} dependentAxis />
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
        </>
      )}
    </Box>
  );
}
