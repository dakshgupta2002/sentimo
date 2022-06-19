const { Router } = require("express");
const isNoteOwner = require("../../auth/authorize.js");
const Note = require("../../models/Note.js");
const protectRouter = Router();

protectRouter.use(isNoteOwner);
protectRouter.route("/")
    .get(async (req, res) => {
        try{
            const filteredNotes = req?.notes?.filter(note => {
                return note && note?.protect;
            });

            res.status(200).json({ notes: filteredNotes });
        }catch(err) {
            res.status(500).json({ "msg": err });
        }
    })
    .put( async (req, res) => {
        try{
            const note = await Note.findById(req?.body?.noteId).exec();
            note.protect = !note.protect;
            await note.save();
            res.status(200).json({protected: note.protected});
        }catch(err){
            res.status(500).json({"msg":"failed"});
        }
    })

module.exports = protectRouter;