import User from "../models/User.js";
import Diary from "../models/Diary.js";

export const isAdmin = async (req, res, next) => {
    const _id = req.user._id;
    User.findById(_id, (err, user) => {
        if (err) {
            res.status(500).end(err);
            return;
        } else {
            if (user.admin === true) {
                next();
            } else {
                res.status(403).end("You are not an admin");
            }
        }
    })  
};

export const isNoteOwner = async (req, res, next) => {
    //check if the note that the user is trying to access is owned by the user
    const _id = req.user?._id;
    const noteId = req.query?.noteId || req.body?.note?._id || req.body?.noteId;
    if (!noteId) {
        next();
        return;
    }
    const diary = await Diary.findOne({user: _id}).exec();

    if (!diary) {res.status(403).json({"msg": "You are not the owner of this note"}); return;}
    const notes = diary.notes;
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].toString() === noteId) {
            next();
            return;
        }
    }

    
    res.status(403).json({"msg":"You are not the owner of this note"});
    return;
}