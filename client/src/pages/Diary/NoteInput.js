import React from 'react'
import { TextField, Button } from '@mui/material'
import { postNote } from '../../utils/api/notes';

import "./Diary.css";

export default function NoteInput(props) {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const addNote = async () => {
        const res = await postNote(title, content);
        if (res.status === 200){
            console.log("Note posted");
            props.close();
            // note post karke phirse fetch karna padega
        }else{
            console.log("Note not posted");
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
            <div className="form-footer" onClick={addNote}>
                <Button>Submit</Button>
            </div>
        </div>
    )
}
