import { Router } from 'express';
import User from '../../models/User.js';
const loginRouter = Router();
import bcrypt from 'bcrypt';
import { jwtGenerator } from '../../auth/authenticate.js';


loginRouter.route("/")
    .post((req, res) => {        
        const { username, password } = req.body;
        User.findOne({username}, (err, user) => {            
            if (err){
                res.status(500).json({err});
                return;
            }else{
                if (user){
                    if (bcrypt.compareSync(password, user.password)){
                        const token = jwtGenerator(user._id);
                        console.log("===User Logged In===");
                        res.json({token, username, firstName: user.firstName, lastName: user.lastName}).status(201);
                    }else{
                        res.status(400).json({"msg": "Incorrect password"});
                    }
                }else{
                    res.status(400).json({"msg":"Username not found"});
                }
            }
        })
    });

export default loginRouter;