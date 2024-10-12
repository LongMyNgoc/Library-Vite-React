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
