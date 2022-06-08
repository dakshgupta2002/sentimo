import { Router } from 'express';
const userRouter = Router();

import loginRouter from './loginRouter.js';
import registerRouter from './registerRouter.js';

userRouter.route("/").get((req, res) => {res.send("User Router")});
userRouter.use("/register", registerRouter);
userRouter.use("/login", loginRouter);
// userRouter.use("/logout", logoutRouter);
// userRouter.use("/profile", profileRouter);
// userRouter.use("/forgot-password", forgotPasswordRouter);
// userRouter.use("/reset-password", resetPasswordRouter);
// userRouter.use("/change-password", changePasswordRouter);

export default userRouter;