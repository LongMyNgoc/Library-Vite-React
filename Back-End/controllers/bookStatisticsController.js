import sql from 'mssql';
import { connectDB } from '../models/database.js';

export const getAllBookStatistics = async (req, res) => {
    try {
        await connectDB();
        const result = await sql.query('SELECT * FROM Book_Statistics');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy dữ liệu Book Statistics', error: err });
    }
};

// Hàm gọi stored procedure Add_Book_Statistic
export const addBookStatistic = async (req, res) => {
    const { BookID, Title, Author, Publisher, Price, Publication_Year, Page_count, Stock_date } = req.body;

    try {
        // Kết nối tới cơ sở dữ liệu
        await connectDB();

        // Thực hiện gọi stored procedure với tham số
        const request = new sql.Request();
        request.input('BookID', sql.Int, BookID);
        request.input('Title', sql.VarChar(255), Title);
        request.input('Author', sql.VarChar(100), Author);
        request.input('Publisher', sql.VarChar(100), Publisher);
        request.input('Price', sql.Decimal(10, 2), Price);
        request.input('Publication_Year', sql.Int, Publication_Year);
        request.input('Page_count', sql.Int, Page_count);
        request.input('Stock_date', sql.Date, Stock_date);

        // Gọi stored procedure Add_Book_Statistic
        await request.execute('Add_Book_Statistic');

        // Trả về phản hồi thành công
        res.json({ message: 'Book statistics added/updated successfully' });
    } catch (err) {
        console.error('Lỗi khi thêm/cập nhật Book Statistic:', err); // Log lỗi chi tiết
        res.status(500).json({ message: 'Lỗi khi thêm/cập nhật Book Statistic', error: err.message });
    }
};
