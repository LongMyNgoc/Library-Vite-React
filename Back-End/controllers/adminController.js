import sql from 'mssql';
import { connectDB } from '../models/database.js';

export const getAllAdmins = async (req, res) => {
    try {
        await connectDB();
        const result = await sql.query('SELECT * FROM Admins');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu admin', error: err });
    }
};
