import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

import reservationRoutes from './routes/reservationRoutes';
import serviceRoutes from './routes/serviceRoutes';
import portfolioRoutes from './routes/portfolioRoutes';
import locationRoutes from './routes/locationRoutes';
import jobApplicationRoutes from './routes/jobApplicationRoutes';
import contactRoutes from './routes/contactRoutes';
import authRoutes from './routes/authRoutes';

const app: Application = express();

app.use(cors({
    origin: [process.env.FRONTEND_URL as string, process.env.CMS_URL as string]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/storage', express.static(path.join(__dirname, 'public')));
app.use('/api', reservationRoutes);
app.use('/api', serviceRoutes);
app.use('/api', portfolioRoutes);
app.use('/api', locationRoutes);
app.use('/api', jobApplicationRoutes);
app.use('/api', contactRoutes);
app.use('/api', authRoutes);

const PORT = process.env.SERVER_PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));