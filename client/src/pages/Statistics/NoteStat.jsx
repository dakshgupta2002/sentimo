import { Box } from "@mui/material";
import React, { useState } from "react";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchNoteStats } from "../../utils/api/stats";
import { VictoryPie } from "victory";
import { Cards } from "../../elements";
//fetch stats for particulary only this note Id
//and stats should be converted to graphs and illustrations

export default function NoteStat() {
  const noteId = useParams().noteId;
  const [emotion, setEmotion] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pieData, setPieData] = useState([]);

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
    refreshPieData();
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
      {/* <h1>{title}</h1>
      <h2>{content} </h2> */}
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
