import { Router } from 'express';
import { authenticate } from '../../auth/authenticate.js';
import { UserNotes } from '../../middlewares/UserNotes.js';
import favouriteRouter from './favouriteRouter.js';
import noteRouter from './noteRouter.js';
import noteSingleRouter from './noteSingleRouter.js';
import protectRouter from './protectRouter.js';

const notesRouter = Router();
notesRouter.use(authenticate); //add the _id param to every request
notesRouter.use(UserNotes); //add the notes to the request

notesRouter.route("*")
    .all((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        
        next();
    });

// noteRouter
notesRouter.use("/", noteRouter);
notesRouter.use("/favourite", favouriteRouter);
notesRouter.use("/protect", protectRouter);
notesRouter.use("/note", noteSingleRouter);

export default notesRouter;