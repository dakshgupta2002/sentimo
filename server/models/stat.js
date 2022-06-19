const mongoose = require("mongoose");
const { Schema } = mongoose;

const statSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    emotion:{
        type: Object,
        required: true
    }
    
}, {timestamps: true});

module.Stat = mongoose.model("Stat", statSchema);