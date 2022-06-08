import { Router } from 'express';
const registerRouter = Router();

registerRouter.route("/", (req, res) => {
    res.send("register");
});

export default registerRouter;