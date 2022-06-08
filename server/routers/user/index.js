import { Router } from 'express';
const userRouter = Router();

import loginRouter from './loginRouter.js';
import registerRouter from './registerRouter.js';

userRouter.route("*")
    .all((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        next();
    });

userRouter.use("/register", registerRouter);
userRouter.use("/login", loginRouter);

// userRouter.use("/profile", profileRouter);
// userRouter.use("/forgot-password", forgotPasswordRouter);
// userRouter.use("/reset-password", resetPasswordRouter);
// userRouter.use("/change-password", changePasswordRouter);

export default userRouter;