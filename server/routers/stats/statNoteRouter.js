import { Router } from "express";
const statNoteRouter = Router();

//router for providing stats of a single note
//save in NoteEmotion collection 
statNoteRouter.route("/")
    .get((req, res) => {
    });

export default statNoteRouter;