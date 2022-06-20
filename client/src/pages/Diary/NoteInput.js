import React from 'react'
import { TextField, Button } from '@mui/material'
import { postNote } from '../../utils/api/notes';

import "./Diary.css";
import { toast } from 'react-toastify';

export default function NoteInput(props) {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const addNote = async () => {
        if (title.trim()==="" || content.trim()===""){
            toast.error("Title and content are required", {
                duration: 2500,
                style: {fontWeight: 800, fontFamily: `"Ubuntu", sans-serif`},
                icon: '❌',
            });
        }
        const res = await postNote(title, content, props.date, props.notesAdded, props.setNotesAdded);
        if (res.response.status === 200 || res.response.status === 201) {
            console.log("Note posted");
            props.close();
        }else{
            console.log("err", res.data.msg);
        }
    }

    return (
        <div className="noteInputForm">
            <h2>Add a new note</h2>

            <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Title" 
                color="secondary"
                fullWidth
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                margin="normal"
            />

            <TextField
                id="outlined-basic"
                placeholder="Content"
                variant="outlined"
                color="secondary"
                fullWidth
                multiline
                rows={15}
                margin="normal"
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
            />
            <br/>
            <div className="form-footer">
                <Button size="large" color="secondary" variant='outlined' onClick={addNote}>Submit</Button>
            </div>
        </div>
    )
}
