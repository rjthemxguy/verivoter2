import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from "./routes/userRoutes.js"
import rivcoRoutes from "./routes/rivcoRoutes.js"

import cookieParser from 'cookie-parser';

dotenv.config()

const port = process.env.PORT;

connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors({
    origin: '*'
}));


app.use("/api2/users", userRoutes)
app.use("/api2/voters",rivcoRoutes)



app.use(errorHandler)
app.use(notFound)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})