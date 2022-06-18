import { Router } from "express";
import { spawn } from "child_process";
import Note from '../../models/Note.js';
import Stat from '../../models/Stat.js';
import NoteEmotion from '../../models/NoteEmotion.js';

const statRouter = Router();

statRouter.route("/note")
    .post(async (req, res) => {
        const noteId = req.body.noteId;
        const noteStat = await NoteEmotion.findOne({ note: noteId }).exec();
        if (noteStat) {
            res.status(200).json({emotion: noteStat.emotion});
            return;
        }

        const note = await Note.findById(noteId).exec();
        let text = note.title + " " + note.content;
        let data = encodeURI(text);
        let emotion;
        
        // spawn new child process to call the python script
        const python = spawn('python', ['scripts/emotion.py', data]);

        python.stdout.on('data', data => {
            emotion = data.toString();
        });

        python.on('close', async () => {
            var obj = "";
            for (var i = 0; i < emotion.length; i++) {
                if (emotion[i] === "'") {
                    obj += '"';
                } else obj += emotion[i];
            }

            obj = (JSON.parse(obj));
            const newNoteEmotion = await new NoteEmotion({
                note: noteId,
                emotion
            });

            newNoteEmotion.save().then(noteEmotion => {
                res.status(201).json({ emotion: noteEmotion.emotion });
                return;
            }).catch(() => {
                res.status(400).json({ message: "Error generating emotion" });
            })
        });
    })

//stat of a user of a particular date 
statRouter.route("/date")
    .post(async (req, res) => {
        const text = req.body.text;
        const date = req.body.date;
        let emotion;

        let data = encodeURI(text);
        // spawn new child process to call the python script
        const python = spawn('python', ['scripts/emotion.py', data]);

        python.stdout.on('data', data => {
            emotion = data.toString();
        });

        python.on('close', async () => {
            var obj = "";
            for (var i = 0; i < emotion.length; i++) {
                if (emotion[i] === "'") {
                    obj += '"';
                } else obj += emotion[i];
            }

            obj = (JSON.parse(obj));
            const newStat = await new Stat({
                user: req.user._id,
                emotion,
                date
            });

            newStat.save().then(stat => {
                res.status(201).json({ stat });
            }).catch(() => {
                res.status(400).json({ message: "Error generating stats" });
            })
        });

        res.status(500).json({ "msg": "Error generating stats" });

    })


statRouter.route("/")
    .get((req, res) => {
        Stat.find({ user: req.user._id })
    })



export default statRouter;