import { Router } from 'express';
import { authenticate } from '../../auth/authenticate.js';
import imageRouter from './imageRouter.js';
import infoRouter from './infoRouter.js';

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

export default profileRouter;