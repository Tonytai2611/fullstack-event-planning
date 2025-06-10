import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import cors from 'cors';
import authRoute from './routes/authRoute.js';
import commentRoute from './routes/commentRoute.js';
import userRoute from './routes/userRoute.js';
import eventRoute from './routes/eventRoute.js';
import adminRoute from './routes/adminRoute.js';
import settingsRoute from './routes/settingsRoute.js';

import cookieParser from 'cookie-parser';
import notificationRoute from './routes/notificationRoute.js';
import eventStatusUpdater from './middleware/eventStatusUpdater.js';

// Log that we're starting
console.log('Starting API server...');

// Load environment variables
dotenv.config();

// Connect to the database
connectDb();

const app = express();

app.use(cors({
  // Sử dụng function để kiểm tra origin động
  origin: function(origin, callback) {
    // Danh sách origins chính thức
    const allowedOrigins = [
      'https://starlit-klepon-0adae4.netlify.app',  // Production URL
      'http://localhost:5173'                       // Development
    ];
    
    // Cho phép tất cả Netlify preview URL có format tương tự
    if (origin && (
      allowedOrigins.includes(origin) || 
      origin.match(/https:\/\/.*--starlit-klepon-0adae4\.netlify\.app$/)
    )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/settings', settingsRoute);
app.use('/api/comments', commentRoute);
app.use('/api/users', userRoute);
app.use('/api/events', eventRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/admin', adminRoute)

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`CORS enabled for origin: ${process.env.CLIENT_URL}`);
    eventStatusUpdater();
});
export default app;

