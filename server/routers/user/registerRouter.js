import { Router } from 'express';
const registerRouter = Router();
import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import { jwtGenerator } from '../../auth/authenticate.js';

registerRouter.route("/")
    .post( (req, res) => {
        const { username, password } = req.body;
        
        User.findOne({username}, (err, user) => {
            if (err){ res.status(500).json({err}); return;};
            if (user){ res.status(400).json({"msg" :"Username already used"}); return; }

            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({username, password: hashedPassword});
            newUser.save((err, user) => {
                if (err){ res.status(500).json({err}); return;};

                const token = jwtGenerator(user._id);
                res.json({token}).status(201);
            });
        });
    })

export default registerRouter;