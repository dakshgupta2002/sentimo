import { Router } from "express";
import { spawn } from "child_process";
import Note from '../../models/Note.js';
import Stat from '../../models/Stat.js';
import NoteEmotion from '../../models/NoteEmotion.js';
import { UserStats } from '../../middlewares/UserStats'

const statRouter = Router();

statRouter.route("/note")
    .post(async (req, res) => {
        const noteId = req.body.noteId;
        const note = await Note.findById(noteId).exec();
        if (!note){
            res.status(404).json({ "msg": "Note not found" });
            return;
        }
        const noteStat = await NoteEmotion.findOne({ note: noteId }).exec();
        
        if (noteStat) {
            console.log("===Found Note's Emotion saved already===")
            res.status(200).json({emotion: noteStat.emotion});
            return;
        }

        let text = note.title + " " + note.content;
        let data = encodeURI(text);
        console.log("===", data, "===");
        let emotion;
        // spawn new child process to call the python script
        const python = spawn('python', ['scripts/test.py', data]);

        python.stdout.on('data', data => {
            emotion = data.toString();
        });

        python.on('close', async (code) => {
            console.log("Exiting with", code);
            var obj = "";
            for (var i = 0; i < emotion.length; i++) {
                if (emotion[i] === "'") {
                    obj += '"';
                } else obj += emotion[i];
            }
            // emotion is a string, parse it to JSON
            obj = JSON.parse(obj);
            // save the emotion to the database
            const newNoteEmotion = new NoteEmotion({
                note: noteId,
                emotion: obj
            });

            newNoteEmotion.save().then(noteEmotion => {
                res.status(201).json({ emotion: noteEmotion.emotion });
                return;
            }).catch(() => {
                res.status(400).json({ message: "Error generating emotion" });
            })
        });
    })

statRouter.use(UserStats)
statRouter.route("/")
    .get(async (req, res) => {
        const days = req.query.days;
        const date = new Date(req.query.date);
        const lastDate = date.setDate(date.getDate() - days)
        console.log("===Fetching User's Stats===")
        //all stats of the user saved in req
        const filteredStats = await req?.stats?.filter(stat => {
            console.log({lastDate: new Date(lastDate).toLocaleDateString(), statDate: new Date(stat?.date).toLocaleDateString()})
            return new Date(lastDate).toLocaleDateString() <=
            new Date(stat?.date).toLocaleDateString()
        })
        console.log(filteredStats)
        await Promise.all(filteredStats).then(filteredStats => {
            res.status(200).json(filteredStats) 
        })
    })



export default statRouter;