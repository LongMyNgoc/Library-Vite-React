import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Thư viện thông báo

const UserCard = ({ isLoggedIn, user, handleLogout}) => {
    // Tạo state cho từng trường có thể chỉnh sửa
    const [fullName, setFullName] = useState(user.Fullname);
    const [address, setAddress] = useState(user.Address);
    const [password, setPassword] = useState(user.Password);

    const handleSave = async () => {
        if (!fullName) {
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
                    password: password,
                    fullname: fullName,
                    address: address,
                }),
            });
    
            if (response.ok) {
                toast.success('User updated successfully!');
                // Dừng 2 giây (2000ms) trước khi gọi handleLogout
                setTimeout(() => {
                     handleLogout(); // Gọi hàm handleLogout sau 2 giây
                }, 2000);
            } else {
                const errorData = await response.json();
                toast.error(`Failed to update user: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user');
        }
    };    

    const handleEdit = () => {
        // Sau khi thanh toán thành công, thực hiện xóa
        handleSave();
    };

    return (
        <div className="card" style={{ width: '100%' }}>
            <div className="card-body">
                <h5 className="card-title">User Information</h5>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="userId" className="form-label">User ID</label>
                            <input type="text" className="form-control" id="userId" value={user.User_ID} disabled />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" value={user.Username} disabled />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="text"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Cập nhật state khi nhập password mới
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="fullname" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullname"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)} // Cập nhật state khi nhập full name mới
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} // Cập nhật state khi nhập address mới
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="registrationDate" className="form-label">Registration Date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="registrationDate"
                                value={new Date(user.Registration_Date).toLocaleDateString('en-CA')}
                                disabled
                            />
                        </div>
                    </div>
                </div>

                {/* Nút cập nhật thông tin */}
                <button className="btn btn-primary" onClick={handleEdit}>
                    Cập nhật thông tin
                </button>
            </div>
        </div>
    );
};

export default UserCard;
