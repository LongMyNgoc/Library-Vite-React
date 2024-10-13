import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Thư viện thông báo

const EditUserModal = ({ user, show, onClose, users, setUsers }) => {
    const [editedUser, setEditedUser] = useState({
        password: '',
        fullname: '',
        address: ''
    });

    // Cập nhật editedUser khi user thay đổi
    useEffect(() => {
        if (user) {
            setEditedUser({
                password: user.Password || '',
                fullname: user.Fullname || '',
                address: user.Address || ''
            });
        }
    }, [user]);

    // Cập nhật state khi thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Hàm lưu thông tin sau khi sửa đổi
    const handleSave = async () => {
        if (!editedUser.fullname) {
            toast.error('Full Name is required!');
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:3000/users/${user.User_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // Chỉ gửi các trường cần cập nhật
                    password: editedUser.password,
                    fullname: editedUser.fullname,
                    address: editedUser.address,
                }),
            });
    
            if (response.ok) {
                const updatedUser = await response.json();
                setUsers((prevUsers) => 
                    prevUsers.map((u) => (u.User_ID === user.User_ID ? { ...u, ...updatedUser } : u))
                );
                toast.success('User updated successfully!');
                onClose();  // Đóng modal sau khi cập nhật
            } else {
                const errorData = await response.json();
                toast.error(`Failed to update user: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user');
        }
    };    

    if (!show) {
        return null; // Không hiển thị modal nếu `show` là false
    }

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit User</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <span>&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={editedUser.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullname"
                                    value={editedUser.fullname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={editedUser.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
