import { Router } from "express";
const statRouter = Router();
import Diary from '../../models/Diary.js';
import Note from '../../models/Note.js';
import { spawn } from 'child_process';

//stat of a user only for single a date 
statRouter.route("/")
    .get(async (req, res) => {
        const userId = req?.user?._id;
        const date = req?.query?.date;
        const diary = await Diary.findOne({user: userId}).exec();
        if (!diary || diary.notes.length===0) {res.status(200).json({emotion: {}}); return;};
        const notes = await diary?.notes?.map(noteId => Note.findById(noteId).exec())

        //notes is an array of promises 
        const filteredNotes = await Promise.all(notes).then(notes => {
            //recieved all of the note document, all promises resolved
            return notes.filter(note => 
                new Date(date).toLocaleDateString()===new Date(note?.createdAt).toLocaleDateString())
            .sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        });

        //now call python script
        var dataToSend;
        // spawn new child process to call the python script
        const python = spawn('python', ['../../scripts/emotion.py', 'Text from Title', 'Text from content']);
        // collect data from script
        python.stdout.on('data', async function (data) {
            dataToSend = await data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            // send data to browser
            res.send({ dataToSend })
        });
    })

export default statRouter;