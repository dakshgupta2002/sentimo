import { Router } from "express";
const statRouter = Router();
import Stat from '../../models/Stat.js';
import { spawn } from 'child_process';
import { atob } from "buffer";

//stat of a user only for single a date 
statRouter.route("/")
    .post(async (req, res) => {
        let text = req.body.text;
        const date = req.body.date;
        text = encodeURI(text);

        var emotion;
        // spawn new child process to call the python script
        const python = spawn('python', ['scripts/emotion.py', text]);

        // collect data from script
        python.stdout.on('data',  (data) => {
            emotion = decodeURI(data);
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', () => {
            res.send(emotion)
        });

        //obtain emotions 
        const newStat = await new Stat({
            user: req.user._id,
            emotion,
            date
        });
        // newStat.save().then(stat => {
        //     res.status(201).json({stat});
        // }).catch( () => {
        //     res.status(400).json({message: "Error generating stats"});
        // })
    })

export default statRouter;