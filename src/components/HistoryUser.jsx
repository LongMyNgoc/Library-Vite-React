import React, { useEffect, useState } from 'react';

const BorrowingRecords = ({ isLoggedIn, user }) => {
    const [borrowingRecords, setBorrowingRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBorrowingRecords = async () => {
            try {
                const response = await fetch('http://localhost:3000/borrowhistory');
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
            record.Book_ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.Borrow_Date.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.Return_Date.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}

            <table className="table table-bordered table-hover" id="borrowingRecordsTable">
                <thead className="table-dark">
                    <tr>
                        <th>History ID</th>
                        <th>Username</th>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Borrow Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBorrowingRecords.length > 0 ? (
                        filteredBorrowingRecords.map(record => (
                            <tr key={record.History_ID}>
                                <td>{record.History_ID}</td>
                                <td>{record.Username}</td>
                                <td>{record.Book_ID}</td>
                                <td>{record.Title}</td>
                                <td>{new Date(record.Borrow_Date).toLocaleDateString('en-CA')}</td>
                                <td>{new Date(record.Return_Date).toLocaleDateString('en-CA')}</td>
                                <td>{record.Status}</td>
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
