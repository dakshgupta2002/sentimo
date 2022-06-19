import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { fetchNotes, fetchNoteSingle, updateNoteSingle } from '../../utils/api/notes';
import { toast } from 'react-toastify';

export default function NoteEdit({ close, editNoteId }) {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const editNote = async () => {
        const res = await updateNoteSingle(title, content, editNoteId);
        if (res?.response?.status === 200){
            toast.success('Note updated successfully');
            fetchNotes(); //fetch today's notes again to update the note
        }else{
            console.log(res?.data?.msg)
        }
        close();
    }

    useEffect( () => {
        const fetchNote = async () => {
            if (editNoteId) {
                const res = await fetchNoteSingle(editNoteId);
                if (res?.response?.status === 200){
                    setTitle(res?.data?.title);
                    setContent(res?.data?.content);
                }else{
                    console.log(res?.data?.msg)
                }
            }
        }
        fetchNote();
    }, [editNoteId])

    return (
        <div className="noteInputForm">
            <h2>Edit the note</h2>

            <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Title"
                color="warning"
                fullWidth
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                margin="normal"
            />

            <TextField
                id="outlined-basic"
                placeholder="Content"
                variant="outlined"
                color="warning"
                fullWidth
                multiline
                rows={15}
                margin="normal"
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
            />
            <br />
            <div className="form-footer">
                <Button size="large" color="warning" variant='outlined' onClick={editNote}>Update</Button>
            </div>
        </div>
    )
}
