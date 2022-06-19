const express = require('express');
require('dotenv').config()
const cors = require('cors');
const db = require('./config/db.js');
const { corsOptions } = require('./config/cors.js');
const userRouter = require('./routers/user/index.js');
const notesRouter = require('./routers/notes/index.js');
const statsRouter = require('./routers/stats/index.js');
const profileRouter = require('./routers/profile/index.js');
require('./crons/DailyStat.js');

const port = process.env.PORT;
const app = express();
app.use(express.json()); //parse req.body to json 

app.use(cors({corsOptions})); //whitelist the cors origin
db(process.env.MONGO_DB_URI); //connect to mongoDB


app.get("/", (req, res) => {
    res.end("Welcome to the Sentimo server!");
})

//setup routes 
app.use("/user", userRouter);
app.use("/notes", notesRouter);
app.use("/stats", statsRouter);
app.use("/profile", profileRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});