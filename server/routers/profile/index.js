const { Router } = require('express');
const authenticate = require('../../auth/authenticate.js');
const imageRouter = require('./imageRouter.js');
const infoRouter = require('./infoRouter.js');

const profileRouter = Router();
profileRouter.use(authenticate)

profileRouter.route('*')
    .all((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        
        next();
    });

profileRouter.use('/image', imageRouter);
profileRouter.use('/info', infoRouter);
//m ake profile update and create 
//update user schema 
//allow edit note 
//upload image so create multer

module.exports = profileRouter;