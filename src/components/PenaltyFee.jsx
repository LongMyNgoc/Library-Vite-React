import React, { useEffect, useState } from 'react';

const BorrowingRecords = ({ isLoggedIn, user }) => {
    const [borrowingRecords, setBorrowingRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Quản lý trạng thái hiển thị modal
    const [selectedRecord, setSelectedRecord] = useState(null); // Quản lý bản ghi được chọn

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

    const filteredBorrowingRecords = borrowingRecords
        .filter(record => record.Username === user?.Username)
        .filter(record =>
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
                    status,
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

    const handleReturnClick = (record) => {
        if (record.PenaltyFee === 0) {
            handleDelete(record.Borrow_ID, record.Book_ID); // Xóa ngay nếu không có phí
        } else {
            setSelectedRecord(record); // Lưu bản ghi đã chọn
            setShowModal(true); // Hiển thị modal
        }
    };

    const handlePayment = () => {
        // Xử lý thanh toán phí tại đây (ví dụ, gọi API xử lý thanh toán)
        alert('Thanh toán thành công!');

        // Sau khi thanh toán thành công, thực hiện xóa
        handleDelete(selectedRecord.Borrow_ID, selectedRecord.Book_ID);

        // Đóng modal
        setShowModal(false);
    };

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}

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
                        <th>PenaltyFee</th>
                        <th>Return</th>
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
                                <td>{record.PenaltyFee}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleReturnClick(record)}
                                    >
                                        Return
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

            {/* Modal Thanh toán */}
            {showModal && (
                <div className="modal show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Thanh toán phí</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Bạn cần thanh toán số tiền: {selectedRecord.PenaltyFee} VNĐ</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={handlePayment}>Thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BorrowingRecords;
