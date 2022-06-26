import { Router } from "express";
import { isNoteOwner } from "../../auth/authorize.js";
import Note from "../../models/Note.js";
const favouriteRouter = Router();

favouriteRouter.use(isNoteOwner);
favouriteRouter.route("/")
    .get(async (req, res) => {
        try{
            const filteredNotes = req?.notes?.filter(note => {
                return note && note?.favourite && !note?.protect;
            });
            console.log("===Sending User's favourite note===");
            res.status(200).json({ notes: filteredNotes });
        }catch(err) {
            res.status(500).json({ "msg": err });
        }
    })
    
    .put( async (req, res) => {
        // negate the favourite status of the note
        const userId = req?.user?._id;
        const noteId = req?.body?.noteId;
        try{
            const note = await Note.findById(noteId).exec();
            note.favourite = !note.favourite;     
            // toggle the favourite status
            await note.save();
            console.log("===Updating Note's Favourite status===");
            res.status(200).json({favourite: note.favourite}); //resource updated
        }catch{
            res.status(500).json({"msg":"failed"});
        }
        
    })

export default favouriteRouter;