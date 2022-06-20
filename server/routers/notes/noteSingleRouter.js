import { Router } from "express";
import Note from "../../models/Note.js";
const noteSingleRouter = Router();

noteSingleRouter.route("/")
    .get(async (req, res) => {
        const noteId = req.query.noteId;
        const note = await Note.findOne({ _id: noteId }).exec();
        res.status(200).json(note);
    })
    .put(async (req, res) => {
        const { title, content } = req.body;
        const noteId = req.query.noteId;
        const note = await Note.findById(noteId).exec();
        if (note.title===title && note.content===content) {
            res.status(200).json({ "msg": "No changes made" });
            return;
        }

        note.title=title;
        note.content=content;
        await note.save();
        
        res.status(201).json(note);
    })

export default noteSingleRouter;