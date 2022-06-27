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
    age: {
        type: Number,
        range:{
            min: { type: Number, min: 5 }
        }
    },
    //mandatory for authorization roles
    admin: {
        type: Boolean,
        default: false
    }



},
{timestamps: true});

export default mongoose.model("User", userSchema);
