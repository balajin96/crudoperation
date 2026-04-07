import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbconnection from './src/configs/dbconfig.js';
import router from './src/routes/route.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://client-crudoperation.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

// ✅ 1. CORS must be first — before everything including DB middleware
app.use(cors(corsOptions));

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await dbconnection();
  isConnected = true;
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ 3. Deduplicated routes
app.use('/api', router);

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`backend is running on port ${PORT}`);
  });
}

export default app;