import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import db from './config/db.js'
import { corsOptions } from './config/cors.js';

const port = process.env.PORT;
const app = express();

app.use(cors({corsOptions})); //whitelist the cors origin
db(process.env.MONGO_DB_URI); //connect to mongoDB


app.get("/", (req, res) => {
    res.end("Welcome to the Sentimo server!");
})

//setup login routes 
// app.use("/user ")

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});