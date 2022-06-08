import { Router } from 'express';
import User from '../../models/user.js';
const loginRouter = Router();
import bcrypt from 'bcrypt';
import { jwtGenerator } from '../../auth/authencticate.js';


loginRouter.route("/")
    .post((req, res) => {        
        const { username, password } = req.body;

        User.findOne({username}, (err, user) => {            
            if (err){
                res.status(500).end(err);
                return;
            }else{
                if (user){
                    if (bcrypt.compareSync(password, user.password)){
                        const token = jwtGenerator(user._id);
                        res.json({token}).status(201);
                    }else{
                        res.status(400).end("Incorrect password");
                    }
                }else{
                    res.status(400).end("Username not found");
                }
            }
        })
    });

export default loginRouter;