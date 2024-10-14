import React, { useEffect, useState } from 'react';

const Users = () => {
    const [users, setUsers] = useState([]); // Danh sách users
    const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách users đã lọc
    const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm

    // Fetch danh sách users khi component được mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/userstatistics');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data); // Cập nhật danh sách users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    // Lọc danh sách users mỗi khi users hoặc searchTerm thay đổi
    useEffect(() => {
        const filterUsers = () => {
            const filtered = users.filter(user =>
                user.Username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.User_ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.Password.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.Fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.Address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                new Date(user.Registration_Date).toLocaleDateString().toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredUsers(filtered); // Cập nhật danh sách users đã lọc
        };

        filterUsers();
    }, [users, searchTerm]); // Chạy khi users hoặc searchTerm thay đổi

    return (
        <>
            {/* Bảng hiển thị danh sách users */}
            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Registration Date</th>
                        <th>Quantity</th>
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
                                <td>{new Date(user.Registration_Date).toLocaleDateString('en-CA')}</td>
                                <td>{user.Quantity}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">Không tìm thấy người dùng</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Users;
