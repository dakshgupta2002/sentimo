import { Router } from "express";
const statNoteRouter = Router();

//router for providing stats of a single note 
statNoteRouter.route("/")
    .get((req, res) => {
    });

export default statNoteRouter;