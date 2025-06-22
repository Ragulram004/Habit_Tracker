import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import userRoutes from './routes/userRoutes.js'
import generateRoute from './routes/generateRoute.js'
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,PUT,POST,DELETE",
}))

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/generate', generateRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
})