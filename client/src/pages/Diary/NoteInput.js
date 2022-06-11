import React from 'react'
import { TextField, Button } from '@mui/material'
import { postNote } from '../../utils/api/notes';

import "./Diary.css";

export default function NoteInput(props) {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const addNote = async () => {
        const res = await postNote(title, content, props.date);
        if (res.response.status === 200 || res.response.status === 201) {
            console.log("Note posted");
            props.close();
        }else{
            console.log("err", res.data.msg);
        }
    }

    return (
        <div className="form-container">
            <h3>Add a note</h3>

            <TextField
                id="outlined-basic"
                placeholder="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                margin="normal"
            />
            <TextField
                id="outlined-basic"
                placeholder="Content"
                variant="outlined"
                fullWidth
                multiline
                rows = {4}
                margin="normal"
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
            />
            <div className="form-footer">
                <Button onClick={addNote}>Submit</Button>
            </div>
        </div>
    )
}
