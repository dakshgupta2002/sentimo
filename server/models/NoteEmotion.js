import mongoose from "mongoose";
const { Schema } = mongoose;

const NoteEmotion = new Schema({
    note:{
        type: Schema.Types.ObjectId,
        ref: "Note",
    },
    emotion:{
        type: Object,
        required: true
    }
})

export default mongoose.model('NoteEmotion', NoteEmotion);