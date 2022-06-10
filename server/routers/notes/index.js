import { Router } from 'express';
import { authenticate } from '../../auth/authenticate.js';
import noteRouter from './noteRouter.js';

const notesRouter = Router();
notesRouter.use(authenticate); //add the _id param to every request

notesRouter.route("*")
    .all((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");

        next();
    });

// noteRouter
notesRouter.use("/", noteRouter);

export default notesRouter;