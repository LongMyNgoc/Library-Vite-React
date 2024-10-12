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

// Middleware để parse JSON từ client
app.use(express.json());

// Route đăng ký user
app.post('/users', async (req, res) => {
    const { username, password, fullname, address } = req.body;

    try {
        const pool = await sql.connect(config); // Kết nối tới cơ sở dữ liệu
        const request = pool.request(); // Tạo yêu cầu từ đối tượng pool
        
        // Gọi thủ tục lưu trữ để thêm user mới
        const result = await request
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .input('fullname', sql.NVarChar, fullname)
            .input('address', sql.NVarChar, address)
            .execute('sp_add_account_with_available_id');
        
        const message = result.recordset[0].Message;

        res.json({ Message: message });
    } catch (err) {
        console.error('Lỗi khi đăng ký user:', err);
        res.status(500).json({ message: 'Lỗi khi đăng ký user', error: err });
    }
});

app.post('/books', async (req, res) => {
    const { title, author, publisher, price, publicationYear, pageCount } = req.body;

    // Log các giá trị nhận được từ request
    console.log('Received data:', req.body);

    try {
        const pool = await sql.connect(config); // Kết nối tới cơ sở dữ liệu
        const request = pool.request(); // Tạo yêu cầu từ đối tượng pool

        // Gọi thủ tục lưu trữ để thêm sách mới
        const result = await request
            .input('title', sql.NVarChar, title)
            .input('author', sql.NVarChar, author)
            .input('publisher', sql.NVarChar, publisher)
            .input('price', sql.Decimal(10, 2), price)
            .input('publication_year', sql.Int, publicationYear)
            .input('page_count', sql.Int, pageCount)
            .execute('sp_add_book_with_available_id');
        
        const message = result.recordset[0].Message;
        console.log('Response message:', message); // Log thông báo phản hồi

        res.json({ Message: message });
    } catch (err) {
        console.error('Lỗi khi thêm sách:', err); // Log lỗi
        res.status(500).json({ message: 'Lỗi khi thêm sách', error: err.message });
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});
