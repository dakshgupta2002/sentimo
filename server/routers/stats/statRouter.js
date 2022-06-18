import { Router } from "express";
const statRouter = Router();
import Stat from '../../models/Stat.js';
import { spawn } from "child_process";

statRouter.route("/note")
.get((req, res) => {
    const { userId, date } = req.query;
    Stat.find({ userId, date })
    
})

//stat of a user of a particular date 
statRouter.route("/date")
.post( async (req, res) => {
        const text = req.body.text;
        const date = req.body.date;
        let emotion;

        let data = encodeURI(text);
        // spawn new child process to call the python script
        const python = spawn('python', ['scripts/emotion.py', data]);
    
        python.stdout.on('data',  data => { 
            emotion = data.toString();
        });
        
        python.on('close', () => {
            var obj="";
            for (var i =0; i<emotion.length; i++){
                if (emotion[i]==="'"){
                    obj += '"';
                }else obj+=emotion[i];
            }

            obj = (JSON.parse(obj));
            console.log(obj.Happy)
        });



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


statRouter.route("/")
    .get((req, res) => {
        Stat.find({ user: req.user._id })
    })
    

        
export default statRouter;