import React, { useEffect, useState } from 'react';
import AddButton from './AddButton'; // Thay đổi AddBookButton thành AddButton để phù hợp với User

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched users:', data); // Kiểm tra dữ liệu trả về
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.User_ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) // Sử dụng toString() cho User_ID
    );

    const handleDelete = (userId) => {
        alert(`Deleting User ID: ${userId}`);
        // Thêm logic xóa người dùng tại đây
    };

    const handleEdit = (userId) => {
        alert(`Editing User ID: ${userId}`);
        // Thêm logic chỉnh sửa người dùng tại đây
    };

    return (
        <>
            {/* Ô tìm kiếm */}
            <input
                type="text"
                id="searchInput"
                className="form-control mb-3"
                placeholder="Tìm kiếm User..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

            {/* Bảng người dùng */}
            <table className="table table-bordered table-hover" id="usersTable">
                <thead className="table-dark">
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Registration Date</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <tr key={user.User_ID}>
                                <td>{user.User_ID}</td>
                                <td>{user.Username}</td>
                                <td>{user.Password}</td>
                                <td>{user.Fullname}</td>
                                <td>{user.Address}</td>
                                <td>{new Date(user.Registration_Date).toLocaleDateString()}</td> {/* Định dạng ngày */}
                                <td>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleEdit(user.User_ID)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(user.User_ID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">No users available</td> {/* Đã sửa colspan */}
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Users;
