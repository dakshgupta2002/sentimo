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
    },
    date: { // timezone matches the client side 
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Note", noteSchema);
