import React, { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Modals = ({ setUser, setIsLoggedIn }) => {
    const [isLogin, setIsLogin] = useState(true); // Trạng thái để chuyển giữa đăng nhập và đăng ký

    // Xử lý đăng nhập
    const handleLogin = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const role = event.target.role.value;

        let url = role === 'admin' ? 'http://localhost:3000/admins' : 'http://localhost:3000/users';

        try {
            const response = await fetch(url);
            const data = await response.json();
            const user = data.find((u) => u.Username === username && u.Password === password);

            if (user) {
                const loggedInUser = { ...user, role };
                setUser(loggedInUser);
                setIsLoggedIn(true);
                alert('Đăng nhập thành công!');

                const loginModal = document.getElementById('loginModal');
                const modalInstance = window.bootstrap.Modal.getInstance(loginModal);
                modalInstance.hide();

                event.target.reset();
            } else {
                alert('Sai thông tin đăng nhập!');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
        }
    };

    // Xử lý đăng ký
    const handleRegister = async (event) => {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const repeatPassword = event.target.repeatPassword.value;
        const fullname = event.target.fullname.value;
        const address = event.target.address.value;
    
        if (password !== repeatPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }
    
        try {
            // Kiểm tra xem username đã tồn tại hay chưa
            const checkResponse = await fetch('http://localhost:3000/users');
            const users = await checkResponse.json();
            const existingUser = users.find((user) => user.Username === username);
    
            if (existingUser) {
                alert('Username đã tồn tại! Vui lòng chọn username khác.');
                return;
            }
    
            // Nếu username không tồn tại, thực hiện đăng ký
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, fullname, address }),
            });
            const result = await response.json();
    
            if (result.Message === 'User created') {
                alert('Đăng ký thành công!');
                setIsLogin(true); // Chuyển về giao diện đăng nhập sau khi đăng ký thành công
                event.target.reset();
            } else {
                alert(result.Message); // Báo lỗi nếu có lỗi khác
            }
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
        }
    };    

    return (
        <>
            {/* Modal Đăng Nhập / Đăng Ký */}
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loginModalLabel">{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Điều hướng giữa Đăng Nhập và Đăng Ký */}
                            <div className="mb-3">
                                <button className="btn btn-link" onClick={() => setIsLogin(true)}>Đăng Nhập</button>
                                <span> / </span>
                                <button className="btn btn-link" onClick={() => setIsLogin(false)}>Đăng Ký</button>
                            </div>

                            {isLogin ? (
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
                            ) : (
                                <form id="registerForm" onSubmit={handleRegister}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="username" name="username" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="password" name="password" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
                                        <input type="password" className="form-control" id="repeatPassword" name="repeatPassword" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fullname" className="form-label">Full Name</label>
                                        <input type="text" className="form-control" id="fullname" name="fullname" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" name="address" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modals;
