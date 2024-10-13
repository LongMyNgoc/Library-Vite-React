import React, { useEffect, useState } from 'react';
import EditUserModal from './UserModal/UserModal'; // Import modal

const Users = () => {
    const [users, setUsers] = useState([]); // Danh sách users
    const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách users đã lọc
    const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
    const [selectedUser, setSelectedUser] = useState(null); // Người dùng được chọn để chỉnh sửa
    const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal

    // Fetch danh sách users khi component được mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3000/users');
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

    // Xử lý khi nhấn nút chỉnh sửa
    const handleEdit = (userId) => {
        const userToEdit = users.find(user => user.User_ID === userId); // Tìm user theo User_ID
        setSelectedUser(userToEdit); // Lưu user được chọn
        setShowModal(true); // Hiển thị modal
    };

    // Xử lý khi xóa người dùng
    const handleDelete = async (userId) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa User ID: ${userId} không?`);
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const updatedUsers = users.filter(user => user.User_ID !== userId); // Cập nhật danh sách
                    setUsers(updatedUsers); // Cập nhật danh sách users
                    alert('Người dùng đã được xóa thành công!');
                } else {
                    const errorData = await response.json();
                    alert(`Lỗi khi xóa người dùng: ${errorData.message}`);
                }
            } catch (error) {
                console.error('Lỗi khi xóa người dùng:', error);
                alert('Có lỗi xảy ra khi xóa người dùng');
            }
        }
    };

    return (
        <>
            {/* Input tìm kiếm */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Tìm kiếm User..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />

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
                                <td>{new Date(user.Registration_Date).toLocaleDateString()}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
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
                            <td colSpan="8">Không tìm thấy người dùng</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal chỉnh sửa người dùng */}
            {showModal && (
                <EditUserModal
                    show={showModal}
                    user={selectedUser}
                    onClose={() => setShowModal(false)}
                    users={users}
                    setUsers={setUsers} // Truyền hàm setUsers để cập nhật danh sách users
                />
            )}
        </>
    );
};

export default Users;
