const mongoose = require("mongoose");
const { Schema } = mongoose;

//this diary contains all the notes 
//of the user with userId

const diarySchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    notes:{
        type: [Schema.Types.ObjectId],
        ref: "Note"
    }
})

module.Diary = mongoose.model("Diary", diarySchema);