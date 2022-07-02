import React, { useEffect, useState } from "react";
import { Sidebar } from "./../../components";
import { Cards } from "./../../elements";
import { fetchFavourite } from "../../utils/api/notes";
import { Tab, Tabs } from "@mui/material";
import { TabPanel } from "../../elements/TabPanel";
import { useLoading } from "../../utils/hooks/useLoading";
import "./Favorite.css";

export default function Favorite() {
  const [notes, setNotes] = useState([]);
  const [value, setValue] = React.useState(0);
  const { setLoading, setError, LoadingScreen } = useLoading();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true); setError('Fetching Favourite Notes')
      const res = await fetchFavourite();
      if (res.response.status === 200) {
        setNotes(res.data.notes);
      }
      setLoading(false);
    };
    getNotes();
  }, []);

  return (
    <div className="favoriteBody">
      <Sidebar />
      <LoadingScreen/>
      <Tabs variant="scrollable" value={value} onChange={handleChange}>
        <Tab label="Favorite Note" />
        <Tab label="Favorite Movie" />
      </Tabs>

      {/* Shows Fav Notes */}
      <TabPanel value={value} index={0}>
        <div className="favourite-container">
          {notes?.length === 0 ? (
            <h1>No notes added in favourites</h1>
          ) : (
            <div className="card-container">
              {notes?.map(
                ({ title, content, _id, favourite, createdAt, updatedAt }) => {
                  return (
                    <Cards
                      key={_id}
                      noteId={_id}
                      title={title}
                      content={content}
                      favourite={favourite}
                      protect={-1}
                      date={new Date(updatedAt).toLocaleDateString("en-GB")}
                      time={new Date(updatedAt).toLocaleTimeString("en-GB")}
                    />
                  );
                }
              )}
            </div>
          )}
        </div>
      </TabPanel>
      
      {/* Show fav movie */}
      <TabPanel value={value} index={1}>
        <h1>Recommended Movies here</h1>
      </TabPanel>
    </div>
  );
}
