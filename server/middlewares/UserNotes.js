const Diary = require("../models/Diary.js");
const Note = require("../models/Note.js");

module.UserNotes = async ( req, res, next ) => {
    const userId = req?.user?._id;
    const date = req?.query?.date;
    const diary = await Diary.findOne({user: userId}).exec();
    if (!diary || diary.notes.length===0) {res.status(200).json({notes: []}); return;};
    const notes = await diary?.notes?.map(noteId => Note.findById(noteId).exec())

    //notes is an array of promises, resolve all 
    await Promise.all(notes).then(notes => {
        req.notes = notes;
        next();
        return;
    })

}