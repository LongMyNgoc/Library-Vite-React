import React, { useEffect, useState } from 'react';
import AddBookButton from './AddButton';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Modal components

const Books = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publisher: '',
        price: '',
        publicationYear: '',
        pageCount: '',
    });

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

    const handleEdit = (book) => {
        setSelectedBook(book);
        setFormData({
            title: book.Title,
            author: book.Author,
            publisher: book.Publisher,
            price: book.Price,
            publicationYear: book.Publication_Year,
            pageCount: book.Page_count,
        });
        setShowModal(true);
    };

    const handleModalClose = () => setShowModal(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdateBook = async () => {
        try {
            const response = await fetch(`http://localhost:3000/books/${selectedBook.Book_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: formData.title,
                    author: formData.author,
                    publisher: formData.publisher,
                    price: parseFloat(formData.price), // Chuyển đổi giá thành số
                    publicationYear: parseInt(formData.publicationYear), // Chuyển đổi năm thành số
                    pageCount: parseInt(formData.pageCount), // Chuyển đổi số trang thành số
                }),
            });

            if (response.ok) {
                alert('Cập nhật sách thành công!');
                setBooks(books.map(book => (book.Book_ID === selectedBook.Book_ID ? updatedBook : book)));
                handleModalClose();
            } else {
                const errorData = await response.json();
                alert(`Lỗi khi cập nhật sách: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật sách:', error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center mt-3">
                <AddBookButton buttonText="Add Book" />
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
                                        onClick={() => handleEdit(book)}
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

            {/* Modal Edit Book */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPublisher">
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control
                                type="text"
                                name="publisher"
                                value={formData.publisher}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPublicationYear">
                            <Form.Label>Publication Year</Form.Label>
                            <Form.Control
                                type="number"
                                name="publicationYear"
                                value={formData.publicationYear}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPageCount">
                            <Form.Label>Page Count</Form.Label>
                            <Form.Control
                                type="number"
                                name="pageCount"
                                value={formData.pageCount}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateBook}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Books;
