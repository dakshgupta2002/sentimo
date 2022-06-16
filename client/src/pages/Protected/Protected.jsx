import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { Cards } from "../../elements";
import { fetchProtected } from "../../utils/api/notes";

import './Protected.css';

export default function Protected({ setLoading }) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      // setLoading(true);
      const res = await fetchProtected();
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

      <div className="protected-container">
        {notes?.length === 0 ? (
          <h1>No notes added in favourites</h1>
        ) : (
          notes?.map(
            ({ title, content, _id, protect, createdAt, updatedAt }) => {
              return (
                <Cards
                  key={_id} noteId={_id}
                  title={title} content={content}
                  favourite={-1}
                  protect = {protect?1:0}
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
