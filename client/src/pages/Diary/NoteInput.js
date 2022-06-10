import React from 'react'
import { TextField, Button } from '@mui/material'
import "./index.css";
import {post} from '../../utils/api/post.js';

export default function NoteInput() {
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    
    const postNote = async () => {
        console.log(title, content);
    }

    return (
        <div className="form-container">
            <div className="">
                <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
            </div>

            <div className="">
                <TextField
                    id="outlined-basic"
                    label="Content"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={content}
                    onChange={(e) => {setContent(e.target.value)}}
                />
            </div>
            <div className="form-footer" onClick={postNote}>
                <Button>Submit</Button>
            </div>

        </div>
    )
}
