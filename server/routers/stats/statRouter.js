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
            // emotion is a string, parse it to JSON
            obj = JSON.parse(obj);
            // save the emotion to the database
            const newNoteEmotion = await new NoteEmotion({
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


statRouter.route("/")
    .get((req, res) => {
        Stat.find({ user: req.user._id })
    })



export default statRouter;