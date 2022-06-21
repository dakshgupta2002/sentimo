import mongoose from "mongoose";
const { Schema } = mongoose;

//this is a basic struct of a note 

const noteSchema = new Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false
    },
    protect: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model("Note", noteSchema);