import { Router } from "express";
import User from '../../models/User.js';
import Note from '../../models/Note.js';
import Diary from '../../models/Diary.js';

const noteRouter = Router();

noteRouter.route("/")
    .get( async (req, res) => {
        console.log(req.query.date)
        // const user = await User.findById(req.user._id).exec();
    })
    .post(async (req, res) => {
        const { title, content } = req.body;
        const userId = req.user._id;

        const note = new Note({title, content});
        const noteId = note._id;
        await note.save()

        const diary = await Diary.findOne({userId}).exec();
        
        if (diary){
            diary.notes.push(noteId);
            await diary.save();
        }else{
            const newDiary = new Diary({userId, notes: [noteId]});
            await newDiary.save();
        }

        res.status(201).json(note);
    })

export default noteRouter;