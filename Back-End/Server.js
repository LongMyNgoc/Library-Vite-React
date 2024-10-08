import express from 'express';
import sql from 'mssql';
import cors from 'cors';

const app = express();
const port = 3000;

const config = {
    user: 'Long',
    password: '123',
    server: 'MSI', // hoặc 'localhost' nếu server SQL đang chạy trên máy của bạn
    database: 'LibraryDB',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:5173', // Thay đổi nếu cần
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Route để lấy danh sách sách
app.get('/books', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Books');
        console.log('Danh sách sách:', result.recordset); // Log dữ liệu lấy được
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu sách:', err); // Log lỗi
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu sách', error: err });
    }
});

// Route để lấy danh sách người dùng
app.get('/users', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng', error: err });
    }
});

// Route để lấy danh sách hồ sơ mượn
app.get('/borrowingrecords', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM BorrowingRecords');
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu hồ sơ mượn:', err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu hồ sơ mượn', error: err });
    }
});

app.get('/admins', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT * FROM Admins');
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu admin:', err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu admin', error: err });
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
