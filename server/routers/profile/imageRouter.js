import { Router } from "express";

const imageRouter = Router();
//input image from the user
//verify with the image in db

imageRouter.route("/")
    .post((req, res) => {
        res.send("upload image");
    })


export default imageRouter;