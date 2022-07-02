import { Router } from "express";
import { spawn } from "child_process";
import Note from '../../models/Note.js';
import Stat from '../../models/Stat.js';
import NoteEmotion from '../../models/NoteEmotion.js';
import { UserStats } from '../../middlewares/UserStats.js'

const statRouter = Router();

statRouter.route("/note")
    .post(async (req, res) => {
        const noteId = req.body.noteId;
        const note = await Note.findById(noteId).exec();
        if (!note) {
            res.status(404).json({ "msg": "Note not found" });
            return;
        }
        const noteStat = await NoteEmotion.findOne({ note: noteId }).exec();
        console.log({noteStat})
        if (noteStat) {
            console.log("===Found Note's Emotion saved already===")
            res.status(200).json({ emotion: noteStat.emotion });
            return;
        }

        let text = note?.title + " " + note?.content;
        let data = encodeURI(text);
        let emotion;
        // // spawn new child process to call the python script
        console.log("===Calling python script===");
        const python = spawn('python3', ['scripts/emotion.py', data]);

        python.stdout.on('data', data => {
            emotion = data.toString();
        });

        python.on('close', async (code) => {
            console.log("===Exiting with", code + "===");

            const arr = emotion.split(',')
            let obj = {};
            obj['Happy'] = parseFloat(arr[0]);
            obj['Angry'] = parseFloat(arr[1]);
            obj['Surprise'] = parseFloat(arr[2]);
            obj['Sad'] = parseFloat(arr[3]);
            obj['Fear'] = parseFloat(arr[4]);

            // save the emotion to the database
            const newNoteEmotion = new NoteEmotion({
                note: noteId,
                emotion: obj
            });

            await newNoteEmotion.save().then(noteEmotion => {
                console.log("===Emotion of this note saved for future")
                res.status(201).json({ emotion: noteEmotion?.emotion });
                return;
            }).catch(() => {
                res.status(400).json({ message: "Error generating emotion" }); 
            })
        });
    })

statRouter.route("/")
    .get(UserStats, async (req, res) => {
        console.log("===Fetching User's Stats===")
        const days = req?.query?.days;
        const date = new Date(req?.query?.date);
        const lastDate = new Date(date.setDate(date.getDate() - days)).toISOString().split('T')[0]; 
        //all stats of the user saved in req latest in the days
        const filteredStats = await req?.stats?.filter(stat => {
            //comparison of date strings in format YYYY-MM-DD is valid
            return lastDate <= (new Date(stat?.date)).toISOString().split('T')[0];
        })
        await Promise.all(filteredStats).then(filteredStats => {
            res.status(200).json(filteredStats)
        })
    })



export default statRouter;
