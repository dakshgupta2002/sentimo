import React, { useEffect, useState } from "react";
import { Sidebar } from "./../../components";
import { Cards } from "./../../elements";
import { fetchFavourite } from "../../utils/api/notes";
import "./Favorite.css";

export default function Favorite({ setLoading }) {
  document.body.style.overflow = "scroll";
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      // setLoading(true);
      const res = await fetchFavourite();
      if (res.response.status === 200) {
        setNotes(res.data.notes);
      }
      // setLoading(false);
    };
    getNotes();
  }, []);

  return (
    <div>
      <Sidebar />

      <div className="favorite-container">
        {notes?.length === 0 ? (
          <h1>No notes added in favourites</h1>
        ) : (
          notes?.map(
            ({ title, content, _id, favourite, createdAt, updatedAt }) => {
              return (
                <Cards
                  key={_id} noteId={_id}
                  title={title} content={content}
                  favourite={favourite}
                  protect = {-1}
                  date={new Date(createdAt).toLocaleDateString()}
                  time={new Date(updatedAt).toLocaleTimeString()}
                />
              );
            }
          )
        )}
      </div>
    </div>
  );
}
