import { Router } from 'express';
const registerRouter = Router();
import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import { jwtGenerator } from '../../auth/authencticate.js';

registerRouter.route("/")
    .post( (req, res) => {
        const { username, password } = req.body;
        User.findOne({username}, (err, user) => {
            if (err){ res.status(500).end(err); return;};
            if (user){ res.status(400).end("Username already used"); return; }
            
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({username, password: hashedPassword});
            newUser.save((err, user) => {
                if (err){ res.status(500).send(err); return;};

                const token = jwtGenerator(user._id);
                res.json({token}).status(201);
            });
        });
    })

export default registerRouter;