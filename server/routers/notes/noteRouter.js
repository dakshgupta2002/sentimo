import { Router } from "express";
import User from '../../models/User.js';
import Note from '../../models/Note.js';
import Diary from '../../models/Diary.js';

const noteRouter = Router();

noteRouter.route("/")
    .get(async (req, res) => {
        const userId = req?.user?._id;
        const date = req?.query?.date;
        const diary = await Diary.findOne({user: userId}).exec();
        if (!diary || diary.notes.length===0) {res.status(200).json({notes: []}); return;};
        const notes = await diary?.notes?.map(noteId => Note.findById(noteId).exec())

        //notes is an array of promises 
        const filteredNotes = await Promise.all(notes).then(notes => {
            //recieved all of the note document, all promises resolved
            return notes.filter(note => 
                new Date(date).toLocaleDateString()===new Date(note.createdAt).toLocaleDateString())
            .sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        });

        res.status(200).json({notes: filteredNotes});
    })
    .post(async (req, res) => {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({"msg": "Missing title or content"});
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