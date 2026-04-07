import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbconnection from './src/configs/dbconfig.js';
import router from './src/routes/route.js';

const app = express();
dotenv.config();
dbconnection();

//middelware
// const corsOptions = { origin: true, credentials: true };
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));
app.use(cors({
  origin: [
    "http://localhost:5173",
    // "https://your-frontend.vercel.app"
  ],
  credentials: true
}));
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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`backend is running ${PORT}`) });

export default app;