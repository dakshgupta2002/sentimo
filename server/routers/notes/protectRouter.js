import { Router } from "express";
import { isNoteOwner } from "../../auth/authorize.js";
import Note from "../../models/Note.js";
const protectRouter = Router();

protectRouter.use(isNoteOwner);
protectRouter.route("/")
    .get(async (req, res) => {
        try{
            const filteredNotes = req?.notes?.filter(note => {
                return note && note?.protected;
            });

            res.status(200).json({ notes: filteredNotes });
        }catch(err) {
            res.status(500).json({ "msg": err });
        }
    })
    .put( async (req, res) => {
        try{
            const note = await Note.findById(req?.body?.noteId).exec();
            note.protect = !note.protected;
            await note.save();
            res.status(200).json({protected: note.protected});
        }catch(err){
            res.status(500).json({"msg":"failed"});
        }
    })

export default protectRouter;