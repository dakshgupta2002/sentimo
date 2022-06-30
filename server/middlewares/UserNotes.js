import Diary from "../models/Diary.js";
import Note from "../models/Note.js";
import User from "../models/User.js";

export const UserNotes = async (req, res, next) => {
    const userId = req?.user?._id;
    console.log("===Getting user's notes===")
    const diary = await Diary.findOne({ user: userId }).exec();
    if (!diary || diary.notes.length === 0) { req.notes = []; next(); return; };
    const notes = await diary?.notes?.map(noteId => Note.findById(noteId).exec())

    //notes is an array of promises, resolve all 
    await Promise.all(notes).then(notes => {
        req.notes = notes;
        next();
        return;
    })
    return;
}

export const canAddMoreNote = async (req, res, next) => {
    const user = await User.findById(req?.user?._id).exec();
    if (user.admin) return true;

    const notesAddedToday = req?.notes?.filter(note => {
        return new Date(req?.body?.date).toLocaleDateString() === new Date(note?.date).toLocaleDateString()
    }).length;

    if (user.premium && notesAddedToday < 8){
        next(); return;
    }
    if (!user.premium && notesAddedToday < 2){
        next(); return;
    }
    res.status(405).json({msg: "Cannot add more notes"});
    return;
}