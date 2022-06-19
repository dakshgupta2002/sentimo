import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { Cards } from "../../elements";
import { fetchProtected } from "../../utils/api/notes";

import "./Protected.css";

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
          <h1>No notes to display</h1>
        ) : (
          <div className="card-container">
            {notes?.map(
              ({ title, content, _id, protect, createdAt, updatedAt }) => {
                return (
                  <Cards
                    key={_id} noteId={_id}
                    title={title} content={content}
                    favourite={-1}
                    protect={protect ? 1 : 0}
                    date={new Date(updatedAt).toLocaleDateString("en-GB")}
                    time={new Date(updatedAt).toLocaleTimeString("en-GB")}
                  />
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}
