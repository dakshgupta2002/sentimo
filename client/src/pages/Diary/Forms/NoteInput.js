import React, { useState } from 'react'
import { TextField, Button } from '@mui/material'
import { postNote } from '../../../utils/api/notes';
import "../Diary.css";
import { toast } from 'react-toastify';
import { useLoading } from '../../../utils/hooks/useLoading';

export default function NoteInput(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [textLimit, setTextLimit] = useState(800);
    const {setLoading} = useLoading();

    const addNote = async () => {
        setLoading(true);
        if (title.trim() === "" || content.trim() === "") {
            toast.error("Title and content are required"); return;
        }
        if (content.length + title.length > textLimit) {
            toast.warn("Text limit reached."); return;
        }
        const res = await postNote(title, content, props.date);
        props.setNotesAdded(props.notesAdded+1)
        if (res.response.status === 200 || res.response.status === 201) {
            console.log("Note posted");
            props.close();
        }else if(res.response.status===405){
            //limit reached open premium sub modal
            toast.info("Basic subscriber can add 2 notes per day")
        } else {
            console.log("err", res.data.msg);
        }
        setLoading(false)
    }

    return (
        <div className="noteInputForm">
            <h2 style={{fontFamily: 'varela', wordSpacing: '2px'}}>Add a new note</h2>

            <TextField
                autoComplete='off'
                id="outlined-basic"
                variant="outlined"
                placeholder="Title"
                color={content.length + title.length > textLimit ? "warning" : "secondary"}
                fullWidth
                focused={true}
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
                margin="normal"
            />

            <TextField
                autoComplete='off'
                id="outlined-basic"
                placeholder="Content"
                variant="outlined"
                color={content.length + title.length > textLimit ? "warning" : "secondary"}
                fullWidth
                focused={true}
                multiline
                rows={15}
                margin="normal"
                value={content}
                /* Title length used with content only */
                onChange={(e) => setContent(e.target.value)}
            />
            <div style={{
                display: 'flex', justifyContent: 'flex-end', fontSize: '0.85rem', width: '100%',
                color: content.length + title.length > textLimit ? 'red' : 'black'
            }}>
                {content.length + title.length}/{textLimit}
            </div>
            <br />
            <div className="form-footer">
                <Button size="large" color={content.length + title.length > textLimit ? "warning" : "secondary"}
                    variant='outlined' onClick={addNote}>Submit</Button>
            </div>
        </div>
    )
}
