import sql from 'mssql';
import { connectDB } from '../models/database.js';

export const getAllBorrowingRecords = async (req, res) => {
    try {
        await connectDB();
        const result = await sql.query('SELECT * FROM BorrowingRecords');
        res.json(result.recordset);
    } catch (err) {
        console.error('Lỗi khi lấy dữ liệu hồ sơ mượn:', err);
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu hồ sơ mượn', error: err });
    }
};

// Hàm thêm hồ sơ mượn sách mới
export const addBorrowingRecord = async (req, res) => {
    const { username, book_id, title } = req.body; // Nhận dữ liệu từ yêu cầu

    try {
        await connectDB();
        const request = new sql.Request();

        // Gọi stored procedure để thêm hồ sơ mượn sách
        const result = await request
            .input('username', sql.NVarChar, username)
            .input('book_id', sql.Int, book_id)
            .input('title', sql.NVarChar, title)
            .execute('sp_add_borrowing_record_with_available_id');
        
        const message = result.recordset[0].Message; // Nhận thông báo phản hồi từ stored procedure
        res.json({ Message: message });
    } catch (err) {
        console.error('Lỗi khi thêm hồ sơ mượn sách:', err); // Log lỗi
        res.status(500).json({ message: 'Lỗi khi thêm hồ sơ mượn sách', error: err });
    }
};
