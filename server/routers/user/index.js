const { Router } = require('express');
const userRouter = Router();
const loginRouter = require('./loginRouter.js')
const registerRouter = require('./registerRouter.js');

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

module.exports = userRouter;