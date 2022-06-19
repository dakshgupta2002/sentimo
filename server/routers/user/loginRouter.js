const { Router } = require('express');
const {jwtGenerator} = require('../../auth/authenticate.js');
const User = require('../../models/User.js');
const bcrypt = require('bcrypt');

const loginRouter = Router();

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

module.exports = loginRouter;