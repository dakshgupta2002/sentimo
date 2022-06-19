const mongoose = require("mongoose");
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

module.NoteEmotion = mongoose.model('NoteEmotion', NoteEmotion);