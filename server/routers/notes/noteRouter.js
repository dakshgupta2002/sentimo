import { Router } from "express";
import User from '../../models/User.js';
import Note from '../../models/Note.js';
import Diary from '../../models/Diary.js';
import NoteEmotion from '../../models/NoteEmotion.js';
import { isNoteOwner } from '../../auth/authorize.js';
import { canAddMoreNote } from "../../middlewares/UserNotes.js";

const noteRouter = Router();

noteRouter.route("/")
    .get(async (req, res) => {
        const date = req?.query?.date;
        const filteredNotes = req?.notes?.filter(note => {
            return !note?.protect &&
             new Date(date).toLocaleDateString() === new Date(note?.date).toLocaleDateString()
        })
        console.log("===Sending User's Note of the Date===");
        filteredNotes.sort((a, b) => new Date(a?.date) - new Date(b?.date)).reverse();
        res.status(200).json({ notes: filteredNotes });
    })

    .post(canAddMoreNote, async (req, res) => {
        const { title, content, date } = req.body;
        if (!title || !content) {
            res.status(400).json({ "msg": "Missing title or content" });
            return;
        }
        const userId = req.user._id;

        const note = new Note({ title, content, date });
        const noteId = note._id;
        await note.save()
        const diary = await Diary.findOne({ user: userId }).exec();

        if (diary) {
            diary.notes.push(noteId);
            await diary.save();
        } else {
            console.log("===Creating a New Diary===");
            const newDiary = new Diary({ user: userId, notes: [noteId] });
            await newDiary.save();
        }
        console.log("===Creating a New Note===");
        res.status(201).json(note);
    })

noteRouter.route("/")
    .delete(isNoteOwner, async (req, res) => {
        const noteId = req.query.noteId;

        const diary = await Diary.findOne({ user: req.user._id }).exec();
        diary.notes.remove(noteId);
        //remove id from notes
        await Note.deleteOne({ _id: noteId }).exec();
        await NoteEmotion.deleteOne({ note: noteId }).exec();
        //remove document from collection
        console.log("===Deleting the User's Note===");
        res.status(200).json({ "msg": "Note deleted" });

    })
export default noteRouter;