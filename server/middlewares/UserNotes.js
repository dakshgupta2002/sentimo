import Diary from "../models/Diary.js";
import Note from "../models/Note.js";

export const UserNotes = async ( req, res, next ) => {
    const userId = req?.user?._id;
    const date = req?.query?.date;
    const diary = await Diary.findOne({user: userId}).exec();
    if (!diary || diary.notes.length===0) {req.notes=[]; next(); return;};
    const notes = await diary?.notes?.map(noteId => Note.findById(noteId).exec())

    //notes is an array of promises, resolve all 
    await Promise.all(notes).then(notes => {
        req.notes = notes;
        next();
        return;
    })

}