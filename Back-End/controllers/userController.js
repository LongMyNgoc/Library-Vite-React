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

export const deleteUser = async (req, res) => {
    const { user_id } = req.params;  // Lấy user_id từ params của request

    try {
        await connectDB();  // Kết nối đến cơ sở dữ liệu
        const request = new sql.Request();

        // Thực hiện câu lệnh SQL để xóa người dùng dựa trên User_ID
        const result = await request
            .input('user_id', sql.Int, user_id)
            .query('DELETE FROM Users WHERE User_ID = @user_id');

        // Kiểm tra nếu không có bản ghi nào bị ảnh hưởng (không tìm thấy user_id)
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với ID này.' });
        }

        res.json({ message: 'Người dùng đã được xóa thành công.' });
    } catch (err) {
        console.error('Lỗi khi xóa người dùng:', err);
        res.status(500).json({ message: 'Lỗi khi xóa người dùng', error: err });
    }
};

export const updateUser = async (req, res) => {
    const { user_id } = req.params; // Lấy user_id từ params
    const { password, fullname, address } = req.body; // Lấy thông tin từ body

    try {
        await connectDB(); // Kết nối đến cơ sở dữ liệu
        const request = new sql.Request();

        // Thực hiện câu lệnh SQL để cập nhật thông tin người dùng
        const result = await request
            .input('user_id', sql.Int, user_id)
            .input('password', sql.NVarChar, password)
            .input('fullname', sql.NVarChar, fullname)
            .input('address', sql.NVarChar, address)
            .query(`
                UPDATE Users 
                SET 
                    Password = @password, 
                    Fullname = @fullname, 
                    Address = @address 
                WHERE User_ID = @user_id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với ID này.' });
        }

        res.json({ message: 'Thông tin người dùng đã được cập nhật thành công.' });
    } catch (err) {
        console.error('Lỗi khi cập nhật người dùng:', err);
        res.status(500).json({ message: 'Lỗi khi cập nhật người dùng', error: err });
    }
};