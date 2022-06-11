import { Router } from "express";
import User from '../../models/User.js';
import Note from '../../models/Note.js';
import Diary from '../../models/Diary.js';

const noteRouter = Router();

noteRouter.route("/")
    .get(async (req, res) => {
        const userId = req?.user?._id;
        const date = req?.query?.date;

        Diary.findOne({ user: userId }, async (err, diary) => {
            if (err) { res.status(500).end(err); return; };
            if (!diary) { res.status(200).end("No diary found"); return; }

            const filteredNotes = await diary.notes.map(noteId => {
                Note.findById(noteId, (err, note) => {
                    if (err) { res.status(500).end(err); return; };
                    if (!note) { res.status(200).end("No note found"); return; }

                    const noteDate = new Date(note.createdAt).toLocaleDateString();
                    const noteTime = new Date(note.createdAt).toLocaleTimeString();

                    if (noteDate === date) {
                        filteredNotes.push({
                            _id: noteId,
                            title: note.title,
                            content: note.content,
                            noteTime: noteTime,
                            noteDate: noteDate,
                            favourite: note.favourite,
                            private: note.private
                        })
                    }
                });
            });
            setTimeout( () => {
                console.log({ filteredNotes })

            }, 2000)

            // filteredNotes.sort((a,b) => {a.noteTime - b.noteTime});

            res.json({ filteredNotes }).status(200);
        });
    })
    .post(async (req, res) => {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).end("Missing title or content");
            return;
        }
        const userId = req.user._id;

        const note = new Note({ title, content });
        const noteId = note._id;
        await note.save()

        const diary = await Diary.findOne({ user: userId }).exec();

        if (diary) {
            diary.notes.push(noteId);
            await diary.save();
        } else {
            const newDiary = new Diary({ user: userId, notes: [noteId] });
            await newDiary.save();
        }

        res.status(201).json(note);
    })

export default noteRouter;