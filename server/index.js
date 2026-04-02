import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbconnection from './src/configs/dbconfig.js';
import router from './src/routes/route.js';

const app = express();
dotenv.config();
dbconnection();

//middelware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//routes
// console.log(app.post);

app.use('/api/createUserData/', router)
app.use('/api/getUserData/', router);
app.use('/api/modifyUserData/', router);
app.use('/api/deleteUser/', router)

app.use('/api/', router)
app.use('/api/',router)

const PORT = process.env.PORT
app.listen(PORT, () => { console.log(`backend is running ${PORT}`) });

