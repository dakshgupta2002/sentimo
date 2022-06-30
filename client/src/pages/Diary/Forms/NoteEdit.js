import React, { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import { fetchNoteSingle, updateNoteSingle } from '../../../utils/api/notes';
import { toast } from 'react-toastify';

export default function NoteEdit({ close, editNoteId, setNotesEdited, notesEdited }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [textLimit, setTextLimit] = useState(800)
    
    const editNote = async () => {
        if (title.trim() === "" || content.trim() === "") {
            toast.error("Title and content are required"); return;
        }
        if (content.length + title.length > textLimit) {
            toast.warn("Text limit reached."); return;
        }
        const res = await updateNoteSingle(title, content, editNoteId);
        if (res?.response?.status===200){
            toast.info("No updates made. Please try again.");
            return;
        }
        if (res?.response?.status === 201){
            toast.success('Note updated successfully');
            setNotesEdited(notesEdited+1);
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
                color={content.length + title.length > textLimit ? "warning" : "secondary"}
                fullWidth
                focused
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                margin="normal"
            />

            <TextField
                id="outlined-basic"
                placeholder="Content"
                variant="outlined"
                color={content.length + title.length > textLimit ? "warning" : "secondary"}
                fullWidth
                multiline
                focused
                rows={15}
                margin="normal"
                value={content}
                onChange={(e) => { setContent(e.target.value) }}
            />
            <br />
            <div style={{
                display: 'flex', justifyContent: 'flex-end', fontSize: '0.85rem', width: '100%',
                color: content.length + title.length > textLimit ? 'red' : 'black'
            }}>
                {content.length + title.length}/{textLimit}
            </div>
            <div className="form-footer">
                <Button size="large" color={content.length + title.length > textLimit ? "warning" : "secondary"} variant='outlined' onClick={editNote}>Update</Button>
            </div>
        </div>
    )
}
