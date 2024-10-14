import React, { useEffect, useState } from 'react';
import AddBookButton from './BookModal/AddButtonStatistics';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Modal components

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/bookstatistics');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched books:', data); // Kiểm tra dữ liệu trả về
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const filteredBooks = books.filter(book =>
        book.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Book_ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Publication_Year.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Page_count.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Stock_date.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Quantity.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <AddBookButton buttonText="Thống Kê" />
            </div>
            <input
                type="text"
                id="searchInput"
                className="form-control mb-3"
                placeholder="Tìm kiếm sách..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            <table className="table table-bordered table-hover" id="booksTable">
                <thead className="table-dark">
                    <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Price</th>
                        <th>Publication Year</th>
                        <th>Page Count</th>
                        <th>Stock Date</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map(book => (
                            <tr key={book.Book_ID}>
                                <td>{book.Book_ID}</td>
                                <td>{book.Title}</td>
                                <td>{book.Author}</td>
                                <td>{book.Publisher}</td>
                                <td>{book.Price}</td>
                                <td>{book.Publication_Year}</td>
                                <td>{book.Page_count}</td>
                                <td>{new Date(book.Stock_date).toLocaleDateString('en-CA')}</td>
                                <td>{book.Quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center">No books available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Books;
