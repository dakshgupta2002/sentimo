import { Router } from "express";
const statRouter = Router();
import Stat from '../../models/Stat.js';
import { spawn } from 'child_process';

//stat of a user only for single a date 
statRouter.route("/")
    .post(async (req, res) => {
        const text = req.body.text;
        const date = req.body.date;

        var emotion;
        // spawn new child process to call the python script
        const python = spawn('python', ['scripts/args.py', "sss"]);

        // collect data from script
        python.stdout.on('data', function (data) {
            console.log('Pipe data from python script ...');
            console.log(data.toString());
            emotion = data.toString();
        });
        // in close event we are sure that stream from child process is closed
        python.on('close', (code) => {
            console.log(`child process close with code ${code}`);
            res.send({emotion})
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