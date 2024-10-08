import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Modals = ({ setUser, setIsLoggedIn }) => {
    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const role = event.target.role.value;

        // Kiểm tra đăng nhập từ localhost cho admin và user
        let url = role === 'admin' ? 'http://localhost:3000/admins' : 'http://localhost:3000/users';

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Kiểm tra username và password
            const user = data.find((u) => u.Username === username && u.Password === password);

            if (user) {
                const loggedInUser = { ...user, role };
                setUser(loggedInUser); // Gửi thông tin user tới App.jsx để xử lý
                setIsLoggedIn(true);
                alert('Đăng nhập thành công!');

                // Ẩn modal sau khi đăng nhập thành công
                const loginModal = document.getElementById('loginModal');
                const modalInstance = window.bootstrap.Modal.getInstance(loginModal);
                modalInstance.hide();

                // Reset lại form để trống input sau khi đăng nhập thành công
                event.target.reset();
            } else {
                alert('Sai thông tin đăng nhập!');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
        }
    };

    return (
        <>
            {/* Modal Đăng Nhập */}
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">Đăng Nhập</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="loginForm" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" name="username" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select id="role" name="role" className="form-select">
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modals;
