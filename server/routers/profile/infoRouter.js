import { Router } from "express";
import User from "../../models/User.js";

const infoRouter = Router();

infoRouter.route("/")
    .get(async (req, res) => {
        const user = await User.findById(req?.user?._id);
        if (user === null) {
            res.json(401).json({ "msg": "User not found" })
            return;
        }

        res.status(200).json(user);
    })

    .put(async (req, res) => {
        try{
            const user = await User.findById(req?.user?._id);
            if (user === null) {
                res.json(401).json({ "msg": "User not found" })
                return;
            }
    
            const { username, password, email, firstName, lastName, phone, address, image, gender, dob } = req?.body;
            console.log(lastName)
            user.username = username;
            user.password = password;
            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;
            user.phone = phone;
            user.address = address;
            user.image = image;
            user.gender = gender;
            user.dob = dob;
            
            await user.save();
            res.status(204).json(user)
        }catch{
            res.status(400).json({msg: "Server error"})
        }
    })


export default infoRouter;