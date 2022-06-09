import User from "../models/user";
import Diary from "../models/diary";

export const isAdmin = (req, res, next) => {
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

export const isNoteOwner = (req, res, next) => {
    //check if the note that the user is trying to access is owned by the user
    const _id = req.user?._id;
    const noteId = req.body?.note?._id;

    const diary = await Diary.findOne({user: _id}).exec();
    const notes = diary.notes;

    for (let i = 0; i < notes.length; i++) {
        if (notes[i]._id === noteId) {
            next();
            return;
        }
    }
    
    res.status(403).end("You are not the owner of this note");
}