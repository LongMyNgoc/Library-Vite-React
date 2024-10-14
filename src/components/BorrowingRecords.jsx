import React, { useEffect, useState } from 'react';

const BorrowingRecords = () => {
    const [borrowingRecords, setBorrowingRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBorrowingRecords = async () => {
            try {
                const response = await fetch('http://localhost:3000/borrowingrecords');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBorrowingRecords(data);
            } catch (error) {
                setError('Error fetching borrowing records');
                console.error('Error fetching borrowing records:', error);
            }
        };

        fetchBorrowingRecords();
    }, []);

    const filteredBorrowingRecords = borrowingRecords.filter(record =>
        record.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.Borrow_ID.toString().includes(searchTerm.toLowerCase()) ||
        record.Book_ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.Borrow_Date.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.Return_Date.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        (record.Status && 'available'.includes(searchTerm.toLowerCase())) ||
        (!record.Status && 'not available'.includes(searchTerm.toLowerCase()))
    );

    const updateBookStatus = async (bookId, status = 0) => {
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
                console.error('Failed to update book status');
            }
        } catch (error) {
            console.error('Error updating book status:', error);
        }
    };

    const handleDelete = async (borrowId, bookId) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa hồ sơ mượn ID: ${borrowId} không?`);
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/borrowingrecords/${borrowId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    alert('Hồ sơ mượn đã được xóa thành công!');
                    await updateBookStatus(bookId);
                    // Cập nhật lại danh sách hồ sơ mượn sau khi xóa
                    setBorrowingRecords(borrowingRecords.filter(record => record.Borrow_ID !== borrowId));
                } else {
                    const errorData = await response.json();
                    alert(`Lỗi khi xóa hồ sơ mượn: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Lỗi khi xóa hồ sơ mượn:', error);
                alert('Có lỗi xảy ra khi xóa hồ sơ mượn');
            }
        }
    };    

    const handleEdit = async (borrowId) => {
        // Thêm logic chỉnh sửa bản ghi tại đây
        alert(`Editing borrow ID: ${borrowId}`);
        // Có thể điều hướng tới trang chỉnh sửa nếu cần
    };

    return (
        <>
            {/* Ô tìm kiếm */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search borrowing records..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            {/* Hiển thị lỗi nếu có */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Bảng dữ liệu */}
            <table className="table table-bordered table-hover" id="borrowingRecordsTable">
                <thead className="table-dark">
                    <tr>
                        <th>Borrow ID</th>
                        <th>Username</th>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBorrowingRecords.length > 0 ? (
                        filteredBorrowingRecords.map(record => (
                            <tr key={record.Borrow_ID}>
                                <td>{record.Borrow_ID}</td>
                                <td>{record.Username}</td>
                                <td>{record.Book_ID}</td>
                                <td>{record.Title}</td>
                                <td>{new Date(record.Borrow_Date).toLocaleDateString('en-CA')}</td>
                                <td>{new Date(record.Return_Date).toLocaleDateString('en-CA')}</td>
                                <td>{record.Status ? 'Available' : 'Not Available'}</td>
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEdit(record.Borrow_ID)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(record.Borrow_ID, record.Book_ID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={9} className="text-center">No borrowing records available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default BorrowingRecords;
