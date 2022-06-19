const { Router } = require('express');
const isNoteOwner = require("../../auth/authorize.js").isNoteOwner;
const Note = require("../../models/Note.js");
const favouriteRouter = Router();

favouriteRouter.use(isNoteOwner);
favouriteRouter.route("/")
    .get(async (req, res) => {
        try{
            const filteredNotes = req?.notes?.filter(note => {
                return note && note?.favourite;
            });

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
            res.status(200).json({favourite: note.favourite}); //resource updated
        }catch{
            res.status(500).json({"msg":"failed"});
        }
        
    })

module.exports = favouriteRouter;