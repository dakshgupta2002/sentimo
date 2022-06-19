import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'

export default function NoteEdit({ close, editNoteId }) {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const editNote = async () => {

    }

    return (
        <div className="noteInputForm">
            <h2>Edit the note</h2>

            <TextField
                id="outlined-basic"
                variant="outlined"
                label="Title"
                color="secondary"
                fullWidth
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                margin="normal"
            />

            <TextField
                id="outlined-basic"
                label="Content"
                variant="outlined"
                color="secondary"
                fullWidth
                multiline
                rows={15}
                margin="normal"
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
            />
            <br />
            <div className="form-footer">
                <Button size="large" color="secondary" variant='outlined' onClick={editNote}>Submit</Button>
            </div>
        </div>
    )
}
