import express from 'express';
import mongoose from 'mongoose';    
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoute.js';

dotenv.config();

const app = express();


app.use(cors());

cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});


app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

  app.get('/', (req, res) => {
    res.send('Welcome to the backend server!');
  });

  app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});