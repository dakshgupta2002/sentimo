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

    //these details can be added later from '/profile'
    email: String,
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    image: String,
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    dob: String,
    //mandatory for authorization roles
    admin: {
        type: Boolean,
        default: false
    },
    premium: {
        type: Boolean,
        deafult: false
    }
},
{timestamps: true});

export default mongoose.model("User", userSchema);
