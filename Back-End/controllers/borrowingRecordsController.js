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

// Xóa hồ sơ mượn sách theo Borrow_ID
export const deleteBorrow = async (req, res) => {
    const { borrow_id } = req.params;  // Lấy borrow_id từ params của request

    try {
        await connectDB();  // Kết nối đến cơ sở dữ liệu
        const request = new sql.Request();

        // Thực hiện câu lệnh SQL để xóa bản ghi mượn sách dựa trên Borrow_ID
        const result = await request
            .input('borrow_id', sql.Int, borrow_id)
            .query('DELETE FROM BorrowingRecords WHERE Borrow_ID = @borrow_id');

        // Kiểm tra nếu không có bản ghi nào bị ảnh hưởng (không tìm thấy borrow_id)
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ mượn sách với ID này.' });
        }

        res.json({ message: 'Hồ sơ mượn sách đã được xóa thành công.' });
    } catch (err) {
        console.error('Lỗi khi xóa hồ sơ mượn sách:', err);
        res.status(500).json({ message: 'Lỗi khi xóa hồ sơ mượn sách', error: err });
    }
};
