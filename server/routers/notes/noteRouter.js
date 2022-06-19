import { Router } from "express";
import User from '../../models/User.js';
import Note from '../../models/Note.js';
import Diary from '../../models/Diary.js';
import { isNoteOwner } from '../../auth/authorize.js';

const noteRouter = Router();

noteRouter.route("/")
    .get(async (req, res) => {
        const date = req?.query?.date;
        const filteredNotes = req?.notes?.filter(note => {
            return new Date(date).toLocaleDateString() === new Date(note?.createdAt).toLocaleDateString()
        })
            
        filteredNotes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        res.status(200).json({ notes: filteredNotes });
    })
    .post(async (req, res) => {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({ "msg": "Missing title or content" });
            return;
        }
        const userId = req.user._id;

        const note = new Note({ title, content });
        const noteId = note._id;
        await note.save()
        console.log("note", note);
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

noteRouter.use(isNoteOwner);
noteRouter.route("/")
    .delete(async (req, res) => {
        const noteId = req.query.noteId;

        const diary = await Diary.findOne({ user: req.user._id }).exec();
        diary.notes.remove(noteId);
        //remove id from notes
        await Note.deleteOne({ _id: noteId }).exec();
        //remove document from collection
        res.status(200).json({ "msg": "Note deleted" });

    })
export default noteRouter;