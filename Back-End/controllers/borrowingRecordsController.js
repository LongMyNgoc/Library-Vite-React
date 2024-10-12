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
