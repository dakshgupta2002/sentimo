import { Router } from "express";
import User from "../../models/User.js";

const infoRouter = Router();

infoRouter.route("/")
    .get( async (req, res) => {
        const user = await User.findById(req?.user?._id);
        res.status(200).json(user);
    })

    .put( (req, res) => {
        res.send("update user info");
    })


export default infoRouter;