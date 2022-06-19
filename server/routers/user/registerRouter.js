const { Router } = require('express');
const jwtGenerator = require('../../auth/authenticate.js');
const User = require('../../models/User.js');
const bcrypt = require('bcrypt');

const registerRouter = Router();

registerRouter.route("/")
    .post( (req, res) => {
        const { username, password, firstName, lastName } = req.body;
        
        User.findOne({username}, (err, user) => {
            if (err){ res.status(500).json({err}); return;};
            if (user){ res.status(400).json({"msg" :"Username already used"}); return; }

            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = new User({username, password: hashedPassword, firstName, lastName});
            newUser.save((err, user) => {
                if (err){ res.status(500).json({err}); return;};

                const token = jwtGenerator(user._id);
                res.json({token, username, firstName, lastName}).status(201);
            });
        });
    })

module.exports = registerRouter;