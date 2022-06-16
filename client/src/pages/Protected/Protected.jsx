import React, { useEffect, useState } from "react";
import { Sidebar } from "../../components";
import { Cards } from "../../elements";
import { fetchProtected } from "../../utils/api/notes";

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
            ({ title, content, _id, favorite, createdAt, updatedAt }) => {
              return (
                <Cards
                  key={_id} noteId={_id}
                  title={title} content={content}
                  favorite={favorite}
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
