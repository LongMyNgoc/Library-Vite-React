import sql from 'mssql';
import { connectDB } from '../models/database.js';

export const getAllBorrowHistory = async (req, res) => {
    try {
        await connectDB();
        const result = await sql.query('SELECT * FROM BorrowHistory');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu borrow history', error: err });
    }
};

export const addBorrowHistory = async (req, res) => {
    const { username, book_id, title } = req.body; // Không cần nhận Borrow_Date từ yêu cầu

    try {
        await connectDB();
        const request = new sql.Request();

        // Câu truy vấn SQL để thêm hồ sơ mượn sách với Borrow_Date là GETDATE()
        const query = `
            INSERT INTO BorrowHistory (Username, Book_ID, Title, Borrow_Date, Status)
            VALUES (@username, @book_id, @title, GETDATE(), @Status);
        `;

        // Thực thi câu truy vấn với các giá trị từ body của yêu cầu
        await request
            .input('username', sql.NVarChar, username)
            .input('book_id', sql.Int, book_id)
            .input('title', sql.NVarChar, title)
            .input('Status', sql.VarChar, 'Borrowed') // Trạng thái mặc định là 'Đang Mượn'
            .query(query);

        // Phản hồi thành công
        res.status(201).json({ Message: 'Hồ sơ mượn sách đã được thêm thành công' });
    } catch (err) {
        console.error('Lỗi khi thêm hồ sơ mượn sách:', err); // Log lỗi
        res.status(500).json({ message: 'Lỗi khi thêm hồ sơ mượn sách', error: err });
    }
};

export const deleteBorrowHistory = async (req, res) => {
    const { history_id } = req.params; // Nhận history_id từ tham số URL

    try {
        await connectDB();
        const request = new sql.Request();

        // Câu truy vấn SQL để xóa hồ sơ mượn sách theo history_id
        const query = `
            DELETE FROM BorrowHistory
            WHERE History_ID = @history_id;
        `;

        // Thực thi câu truy vấn với giá trị từ tham số của yêu cầu
        const result = await request
            .input('history_id', sql.Int, history_id)
            .query(query);

        // Kiểm tra xem có bản ghi nào được xóa không
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ mượn sách với ID đã cho' });
        }

        // Phản hồi thành công
        res.status(200).json({ Message: 'Hồ sơ mượn sách đã được xóa thành công' });
    } catch (err) {
        console.error('Lỗi khi xóa hồ sơ mượn sách:', err); // Log lỗi
        res.status(500).json({ message: 'Lỗi khi xóa hồ sơ mượn sách', error: err });
    }
};

// Hàm cập nhật trạng thái và ngày trả sách
export const editBorrowHistory = async (req, res) => {
    const { book_id } = req.params; // Nhận history_id từ tham số URL

    try {
        await connectDB();
        const request = new sql.Request();

        // Câu truy vấn SQL để cập nhật trạng thái và Return_Date cho hồ sơ mượn sách
        const query = `
            UPDATE BorrowHistory
            SET Status = @status, Return_Date = GETDATE()
            WHERE Book_ID = @book_id;
        `;

        // Thực thi câu truy vấn với giá trị từ yêu cầu
        const result = await request
            .input('status', sql.NVarChar, 'Returned') // Trạng thái mới là 'Returned'
            .input('book_id', sql.Int, book_id)
            .query(query);

        // Kiểm tra xem có bản ghi nào được cập nhật không
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy hồ sơ mượn sách với ID đã cho' });
        }

        // Phản hồi thành công
        res.status(200).json({ Message: 'Hồ sơ mượn sách đã được cập nhật thành công' });
    } catch (err) {
        console.error('Lỗi khi cập nhật hồ sơ mượn sách:', err); // Log lỗi
        res.status(500).json({ message: 'Lỗi khi cập nhật hồ sơ mượn sách', error: err });
    }
};
