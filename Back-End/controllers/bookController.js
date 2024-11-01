import sql from 'mssql';
import { connectDB } from '../models/database.js';

export const getAllBooks = async (req, res) => {
    try {
        await connectDB();
        const result = await sql.query('SELECT * FROM Books');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu sách', error: err });
    }
};

export const addBook = async (req, res) => {
    const { title, author, publisher, price, publicationYear, pageCount } = req.body;
    try {
        await connectDB();
        const request = new sql.Request();
        const result = await request
            .input('title', sql.NVarChar, title)
            .input('author', sql.NVarChar, author)
            .input('publisher', sql.NVarChar, publisher)
            .input('price', sql.Decimal(10, 2), price)
            .input('publication_year', sql.Int, publicationYear)
            .input('page_count', sql.Int, pageCount)
            .execute('sp_add_book_with_available_id');
        res.json({ Message: result.recordset[0].Message });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi thêm sách', error: err });
    }
};

// Hàm xóa sách theo Book_ID
export const deleteBook = async (req, res) => {
    const { book_id } = req.params;  // Lấy book_id từ params của request

    try {
        await connectDB();  // Kết nối đến cơ sở dữ liệu
        const request = new sql.Request();

        // Thực hiện câu lệnh SQL để xóa sách dựa trên Book_ID
        const result = await request
            .input('book_id', sql.Int, book_id)
            .query('DELETE FROM Books WHERE Book_ID = @book_id');

        // Kiểm tra nếu không có bản ghi nào bị ảnh hưởng (không tìm thấy book_id)
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sách với ID này.' });
        }

        res.json({ message: 'Sách đã được xóa thành công.' });
    } catch (err) {
        console.error('Lỗi khi xóa sách:', err);
        res.status(500).json({ message: 'Lỗi khi xóa sách', error: err });
    }
};

// Cập nhật sách theo Book_ID
export const updateBook = async (req, res) => {
    const { book_id } = req.params; // Lấy book_id từ params
    const { title, author, publisher, price, publicationYear, pageCount } = req.body; // Lấy thông tin từ body

    try {
        await connectDB(); // Kết nối đến cơ sở dữ liệu
        const request = new sql.Request();

        // Thực hiện câu lệnh SQL để cập nhật thông tin sách
        const result = await request
            .input('book_id', sql.Int, book_id)
            .input('title', sql.NVarChar, title)
            .input('author', sql.NVarChar, author)
            .input('publisher', sql.NVarChar, publisher)
            .input('price', sql.Decimal(10, 2), price)
            .input('publication_year', sql.Int, publicationYear)
            .input('page_count', sql.Int, pageCount)
            .query(`
                UPDATE Books 
                SET 
                    Title = @title,
                    Author = @author,
                    Publisher = @publisher,
                    Price = @price,
                    Publication_Year = @publication_year,
                    Page_Count = @page_count
                WHERE Book_ID = @book_id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sách với ID này.' });
        }

        res.json({ message: 'Thông tin sách đã được cập nhật thành công.' });
    } catch (err) {
        console.error('Lỗi khi cập nhật sách:', err);
        res.status(500).json({ message: 'Lỗi khi cập nhật sách', error: err });
    }
};

export const borrowBook = async (req, res) => {
    const { book_id } = req.params; // Lấy Book_ID từ params
    const { status } = req.body; // Lấy status từ body của request

    try {
        await connectDB();
        const request = new sql.Request();

        // Cập nhật Status theo giá trị được truyền từ body
        const result = await request
            .input('book_id', sql.Int, book_id)
            .input('status', sql.Int, status) // Truyền thêm status từ body
            .query(`
                UPDATE Books
                SET Status = @status
                WHERE Book_ID = @book_id
            `);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sách với ID này.' });
        }

        res.json({ message: 'Trạng thái sách đã được cập nhật thành công.' });
    } catch (err) {
        console.error('Lỗi khi mượn sách:', err);
        res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái sách', error: err });
    }
};
