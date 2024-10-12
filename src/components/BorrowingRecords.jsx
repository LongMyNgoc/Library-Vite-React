import React, { useEffect, useState } from 'react';
import AddButton from './AddButton';

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
        record.Borrow_ID.toString().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (borrowId) => {
        alert(`Deleting borrow ID: ${borrowId}`);
        // Thêm logic xóa bản ghi tại đây
    };

    const handleEdit = (borrowId) => {
        alert(`Editing borrow ID: ${borrowId}`);
        // Thêm logic chỉnh sửa bản ghi tại đây
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
                                <td>{new Date(record.Borrow_Date).toLocaleDateString()}</td>
                                <td>{new Date(record.Return_Date).toLocaleDateString()}</td>
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
                                        onClick={() => handleDelete(record.Borrow_ID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={8} className="text-center">No borrowing records available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default BorrowingRecords;
