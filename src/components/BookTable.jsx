import React, { useEffect, useState } from 'react';

const BookTable = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/books');
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
        book.Author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
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
                        <th>Status</th>
                        <th>Borrow</th>
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
                                <td>{new Date(book.Stock_date).toLocaleDateString()}</td>
                                <td>{book.Status === 0 ? 'Available' : 'Not Available'}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => alert(`Borrowing book ID: ${book.Book_ID}`)}
                                    >
                                        Borrow
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10" className="text-center">No books available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default BookTable;
