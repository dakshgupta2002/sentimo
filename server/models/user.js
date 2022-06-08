import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true
    }

},
{timestamps: true});

export default mongoose.model("User", userSchema);


// https://blog.logrocket.com/using-passport-authentication-node-js/


// https://www.youtube.com/watch?v=cOFAmaMBVps
// https://leetcode.com/problems/single-number-ii