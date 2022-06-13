import { Router } from "express";
const statRouter = Router();

statRouter.route("/")
    .get((req, res) => {
        const date = req.query.date;
        const userId = req.user._id;
        
    })

export default statRouter;