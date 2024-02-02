import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 6001;
import userRoutes from './routes/userRoutes.js'
import menuRoutes from './routes/menuRoutes.js'
import OrderRoutes from './routes/0rderRoutes.js'
import ReservationRoutes from './routes/ReservationRoutes.js'
import catogaryRoutes from './routes/catogaryRoutes.js'

const mongoString = process.env.DATABASE_URL
const app = express();
mongoose.connect(mongoString)
const database = mongoose.connection

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (cors);

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/items', menuRoutes);
app.use('/api/order', OrderRoutes);
app.use('/api/table', ReservationRoutes);
app.use('/api/category', catogaryRoutes);


app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

//database connection server 
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
}) 
