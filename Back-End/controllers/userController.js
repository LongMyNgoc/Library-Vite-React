import sql from 'mssql';
import { connectDB } from '../models/database.js';

export const getAllUsers = async (req, res) => {
    try {
        await connectDB();
        const result = await sql.query('SELECT * FROM Users');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng', error: err });
    }
};

export const registerUser = async (req, res) => {
    const { username, password, fullname, address } = req.body;
    try {
        await connectDB();
        const request = new sql.Request();
        const result = await request
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, password)
            .input('fullname', sql.NVarChar, fullname)
            .input('address', sql.NVarChar, address)
            .execute('sp_add_account_with_available_id');
        res.json({ Message: result.recordset[0].Message });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi đăng ký user', error: err });
    }
};
