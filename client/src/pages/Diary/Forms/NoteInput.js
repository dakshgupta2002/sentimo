import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { postNote } from '../../../utils/api/notes';
import "../Diary.css";
import { toast } from 'react-toastify';

export default function NoteInput(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [textLimit, setTextLimit] = useState(800)
    
    const addNote = async () => {
        if (title.trim()==="" || content.trim()===""){
            toast.error("Title and content are required", {
                duration: 2500,
                icon: '❌',
            });
        }
        if (content.length > textLimit){
            toast.warn("Text limit reached.")
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
                autoComplete='off'
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
                autoComplete='off'
                id="outlined-basic"
                placeholder="Content"
                variant="outlined"
                color="secondary"
                fullWidth
                multiline
                rows={15}
                margin="normal"
                value={content}

                /* Title length used with content only */
                onChange={(e) => setContent(e.target.value)}
            />
            <div style={{display: 'flex', justifyContent: 'flex-end', fontSize: '1rem', width: '100%'}}>
                {content.length}/{textLimit}
            </div>
            <br />
            <div className="form-footer">
                <Button size="large" color="secondary" variant='outlined' onClick={addNote}>Submit</Button>
            </div>
        </div>
    )
}
