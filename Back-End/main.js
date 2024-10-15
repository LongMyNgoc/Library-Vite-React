import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import borrowingRecordsRoutes from './routes/borrowingRecordsRoutes.js';  // Thêm route borrowing records
import bookStatistics from './routes/bookStatisticsRoutes.js';
import userStatistics from './routes/userStatisticsRoutes.js';
import borrowHistory from './routes/borrowHistory.js';

const app = express();
const port = 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Sử dụng các routes
app.use(bookRoutes);
app.use(userRoutes);
app.use(adminRoutes);
app.use(borrowingRecordsRoutes);  // Sử dụng route borrowing records
app.use(bookStatistics);
app.use(userStatistics);
app.use(borrowHistory);

app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
