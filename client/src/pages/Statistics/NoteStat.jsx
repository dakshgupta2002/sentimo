import { Box } from "@mui/material";
import React, {useState} from "react";
import { Sidebar } from "../../components";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchNoteStats } from "../../utils/api/stats";
//fetch stats for particulary only this note Id
//and stats should be converted to graphs and illustrations

export default function NoteStat() {
  const noteId = useParams().noteId;
  const [emotion, setEmotion] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect( () => {
    const fetchStat = async () => {
      const res = await fetchNoteStats(noteId);
      if (res?.response?.status === 201 || res?.response?.status === 200){
        console.log(res?.data?.emotion);
        setEmotion(res?.data?.emotion);
        setTitle(res?.data?.title);
        setContent(res?.data?.content);
      }else{
        console.log(res?.data?.msg);
      }
    }

    fetchStat();
  }, [])

  return (
    <Box>
      <Sidebar />
      <h1>{title}</h1>
      <h2>{content} </h2>
      <span><h4>Happy</h4>: {emotion.Happy}  </span> <br/>
      <span><h4>Sad</h4>: {emotion.Sad} </span> <br/>
      <span><h4>Angry</h4>: {emotion.Angry} </span> <br/>
      <span><h4>Surprise</h4>: {emotion.Surprise} </span> <br/>
      <span><h4>Fear</h4>: {emotion.Fear} </span> <br/>
    </Box>
  );
}
