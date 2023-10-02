import express, { Application } from 'express';
import cors from 'cors';
require('dotenv').config();
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import newsletterRoutes from './routes/newsletterRoutes';
import productRoutes from './routes/productRoutes';
import likeRoutes from './routes/likeRoutes';
import cartRoutes from './routes/cartRoutes';
import contactRoutes from './routes/contactRoutes';
import orderRoutes from './routes/orderRoutes';
import reviewRoutes from './routes/reviewRoutes';
import returnRoutes from './routes/returnRoutes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/storage', express.static(`${__dirname}/public`));
app.use('/api', userRoutes);
app.use('/api', authRoutes);
app.use('/api', categoryRoutes);
app.use('/api', newsletterRoutes);
app.use('/api', productRoutes);
app.use('/api', likeRoutes);
app.use('/api', cartRoutes);
app.use('/api', contactRoutes);
app.use('/api', orderRoutes);
app.use('/api', reviewRoutes);
app.use('/api', returnRoutes);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));