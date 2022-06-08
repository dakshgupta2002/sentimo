import mongoose from "mongoose";
const { Schema } = mongoose;

const statSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
})