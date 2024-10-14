import sql from 'mssql';
import { connectDB } from '../models/database.js';

export const getAllUserStatistics = async (req, res) => {
    try {
        await connectDB();
        const result = await sql.query('SELECT * FROM User_Statistics');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu Book Statistics', error: err });
    }
};

export const addUserStatistic = async (req, res) => {
    const { Username, Password, Fullname, Address } = req.body;

    try {
        // Kết nối tới cơ sở dữ liệu
        await connectDB();

        // Thực hiện gọi stored procedure với tham số
        const request = new sql.Request();
        request.input('Username', sql.NVarChar(100), Username);
        request.input('Password', sql.NVarChar(255), Password);
        request.input('Fullname', sql.NVarChar(255), Fullname);
        request.input('Address', sql.NVarChar(255), Address);

        // Gọi stored procedure Add_User_Statistic
        await request.execute('Add_User_Statistic');

        // Trả về phản hồi thành công
        res.json({ message: 'User statistics added/updated successfully' });
    } catch (err) {
        console.error('Lỗi khi thêm/cập nhật User Statistic:', err); // Log lỗi chi tiết
        res.status(500).json({ message: 'Lỗi khi thêm/cập nhật User Statistic', error: err.message });
    }
};
