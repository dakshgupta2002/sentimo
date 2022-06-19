const { Router } = require('express');
const authenticate = require('../../auth/authenticate.js');
const UserNotes = require('../../middlewares/UserNotes.js');
const favouriteRouter = require('./favouriteRouter.js');
const noteRouter = require('./noteRouter.js');
const protectRouter = require('./protectRouter.js');

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

module.exports = notesRouter;