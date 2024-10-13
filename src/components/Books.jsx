import React, { useEffect, useState } from 'react';
import AddBookButton from './AddButton';

const Books = () => {
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
        book.Author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Book_ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Price.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Publication_Year.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Page_count.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Stock_date.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.Status === 0 && 'available'.includes(searchTerm.toLowerCase()) ||
        book.Status === 1 && 'not available'.includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (bookId) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa sách ID: ${bookId} không?`);
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/books/${bookId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    alert('Sách đã được xóa thành công!');
                    // Cập nhật lại danh sách sách sau khi xóa
                    setBooks(books.filter(book => book.Book_ID !== bookId));
                } else {
                    const errorData = await response.json();
                    alert(`Lỗi khi xóa sách: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Lỗi khi xóa sách:', error);
                alert('Có lỗi xảy ra khi xóa sách');
            }
        }
    };    

    const handleEdit = (bookId) => {
        alert(`Editing book ID: ${bookId}`);
        // Thêm logic chỉnh sửa sách tại đây
    };

    return (
        <>
      <div className="d-flex justify-content-center mt-3">
                    <AddBookButton buttonText = "Add Book" /> {/* Thêm button vào đây */}
                </div>  
            {/* Search Input */}
            <input
                type="text"
                id="searchInput"
                className="form-control mb-3"
                placeholder="Tìm kiếm sách..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            {/* Book Table */}
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
                        <th>Edit</th>
                        <th>Delete</th>
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
                                        className="btn btn-warning"
                                        onClick={() => handleEdit(book.Book_ID)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(book.Book_ID)}
                                    >
                                        Delete
                                    </button>
                                </td>
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
