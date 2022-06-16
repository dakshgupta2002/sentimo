import { Router } from "express";
import { isNoteOwner } from "../../auth/authorize.js";
import Note from "../../models/Note.js";
const favouriteRouter = Router();

favouriteRouter.use(isNoteOwner);
favouriteRouter.route("/")

    .put( async (req, res) => {
        // negate the favourite status of the note
        const userId = req?.user?._id;
        const noteId = req?.body?.noteId;
        try{
            const note = await Note.findById(noteId).exec();
            note.favourite = !note.favourite;     
            // toggle the favourite status
            await note.save();
            res.status(200).json({favourite: note.favourite}); //resource updated
        }catch{
            res.status(500).json({"msg":"failed"});
        }
        
    })

export default favouriteRouter;