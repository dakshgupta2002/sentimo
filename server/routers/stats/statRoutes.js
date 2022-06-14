import { Router } from "express";
const statRouter = Router();
import Diary from '../../models/Diary.js';
import Note from '../../models/Note.js';
import { spawn } from 'child_process';

//stat of a user only for single a date 
statRouter.route("/")
    .post(async (req, res) => {
        const text = req.body.text;

        var dataToSend;
        // spawn new child process to call the python script
        const child = spawn('python', ['./emotion.py']);
        // collect data from script
        child.stdout.on('data', function (data) {
            dataToSend = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        child.on('close', (code) => {
            console.log(`child process close all stdio with code ${code}`);
            // send data to browser
            res.send(dataToSend)
        });
    })

export default statRouter;