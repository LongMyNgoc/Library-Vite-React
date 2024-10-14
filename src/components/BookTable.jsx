import React, { useEffect, useState } from 'react';

const BookTable = ({ isLoggedIn, user }) => {
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
                alert('An error occurred while fetching books.'); // Thông báo cho người dùng
            }
        };
    
        fetchBooks();
    }, []);
    
    const filteredBooks = books.filter(book => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            book.Title.toLowerCase().includes(searchTermLower) ||
            book.Author.toLowerCase().includes(searchTermLower) ||
            book.Book_ID.toString().toLowerCase().includes(searchTermLower) ||
            book.Publisher.toLowerCase().includes(searchTermLower) ||
            book.Price.toString().toLowerCase().includes(searchTermLower) ||
            book.Publication_Year.toString().toLowerCase().includes(searchTermLower) ||
            book.Page_count.toString().toLowerCase().includes(searchTermLower) ||
            book.Stock_date.toString().toLowerCase().includes(searchTermLower) ||
            (book.Status === 0 && 'available'.includes(searchTermLower)) ||
            (book.Status === 1 && 'not available'.includes(searchTermLower))
        );
    });    

    const updateBookStatus = async (bookId, status = 1) => {
        try {
            const response = await fetch(`http://localhost:3000/books/${bookId}/borrow`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status, // Truyền status từ client
                }),
            });
    
            if (response.ok) {
                console.log('Book status updated successfully');
            } else {
                const errorData = await response.json();
                alert(`Failed to update book status: ${errorData.message}`);
                console.error('Failed to update book status');
            }
        } catch (error) {
            console.error('Error updating book status:', error);
            alert('An error occurred while updating the book status.');
        }
    };    

    const handleBookStatistics = async (book) => {
        try {
            const response = await fetch('http://localhost:3000/bookstatistics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    BookID: book.Book_ID,
                    Title: book.Title,
                    Author: book.Author,
                    Publisher: book.Publisher,
                    Price: book.Price,
                    Publication_Year: book.Publication_Year,
                    Page_count: book.Page_count,
                    Stock_date: book.Stock_date,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert(`Successfully added book statistics: ${book.Title}`);
            } else {
                console.error(`Failed to add book statistics: ${data.message}`);
                alert(`Failed to add book statistics: ${data.message}`);
            }
        } catch (error) {
            console.error('Error adding book:', error);
            alert('An error occurred while adding the book.');
        }
    };    

    const handleBorrowBook = async (book) => {
        // Kiểm tra xem người dùng đã đăng nhập và có vai trò "user" chưa
        if (isLoggedIn && user?.role === 'user') {
            try {
                const response = await fetch('http://localhost:3000/borrowingrecords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: user.Username, // Tên người dùng đang đăng nhập
                        book_id: book.Book_ID,   // ID của cuốn sách muốn mượn
                        title: book.Title        // Tiêu đề của sách
                    }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    alert(`Successfully borrowed book: ${book.Title}`);
                    await updateBookStatus(book.Book_ID); // Gọi cập nhật trạng thái sách
                    await handleBookStatistics(book);
                    setBooks(prevBooks =>
                        prevBooks.map(b => 
                            b.Book_ID === book.Book_ID ? { ...b, Status: 1 } : b
                        )
                    );
                } else {
                    alert(`Failed to borrow book: ${data.Message}`);
                }
            } catch (error) {
                console.error('Error borrowing book:', error);
                alert('An error occurred while borrowing the book.');
            }
        } else {
            // Nếu người dùng chưa đăng nhập hoặc không có quyền
            alert('You must be logged in as a user to borrow books.');
        }
    };    

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
                                <td>{new Date(book.Stock_date).toLocaleDateString('en-CA')}</td> 
                                <td>{book.Status === 0 ? 'Available' : 'Not Available'}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleBorrowBook(book)} // Gọi hàm borrow khi nhấn
                                        disabled={book.Status !== 0} // Vô hiệu hóa nếu sách không có sẵn
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
