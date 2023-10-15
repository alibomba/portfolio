import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import path from 'path';
dotenv.config();
import projectRoutes from './routes/projectRoutes';
import newsRoutes from './routes/newsRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import fundRoutes from './routes/fundRoutes';
import adviceRoutes from './routes/adviceRoutes';
import contactRoutes from './routes/contactRoutes';

const app: Application = express();

app.use(cors({
    origin: process.env.FRONTEND_URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/storage', express.static(path.join(__dirname, 'public')));
app.use('/api', projectRoutes);
app.use('/api', newsRoutes);
app.use('/api', newsletterRoutes);
app.use('/api', fundRoutes);
app.use('/api', adviceRoutes);
app.use('/api', contactRoutes);

const PORT = process.env.SERVER_PORT || 8000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
