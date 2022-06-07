import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import db from './config/db.js'
import { corsOptions } from './config/cors.js';

const app = express();

app.use(cors(corsOptions)); //whitelist the cors origin
db(process.env.MONGO_DB_URI); //connect to mongoDB

//setup login routes 
// app.use("/user ")

app.listen(3001, () => {
    console.log('server is running on port 3001');
});