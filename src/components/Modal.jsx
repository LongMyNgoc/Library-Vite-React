import React, { useState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Modals = ({ setUser, setIsLoggedIn }) => {
    const [isLogin, setIsLogin] = useState(true); // Trạng thái để chuyển giữa đăng nhập và đăng ký
    const [isForgotPassword, setIsForgotPassword] = useState(false); // Trạng thái hiển thị modal quên mật khẩu
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // Lưu trữ người dùng tạm thời khi xác minh quên mật khẩu

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

    // Xử lý quên mật khẩu (bước xác minh thông tin)
    const handleForgotPassword = async (event) => {
        event.preventDefault();
        const username = event.target.usernameforgot.value;
        const fullname = event.target.fullnameforgot.value;
        const address = event.target.addressforgot.value;

        try {
            const response = await fetch('http://localhost:3000/users');
            const data = await response.json();
            const user = data.find((u) => u.Username === username && u.Fullname === fullname && u.Address === address);

            if (user) {
                setCurrentUser(user); // Lưu trữ thông tin user đã xác minh
                alert('Thông tin chính xác! Hãy đặt lại mật khẩu.');
                setIsForgotPassword(false); // Ẩn modal xác minh, mở modal đặt lại mật khẩu
                setIsResetPassword(true);
                const modalInstance = window.bootstrap.Modal.getOrCreateInstance(document.getElementById('resetPasswordModal'));
                modalInstance.show();
            } else {
                alert('Thông tin không chính xác!');
            }
        } catch (error) {
            console.error('Lỗi khi xác minh thông tin:', error);
        }
    };

    // Xử lý đặt lại mật khẩu
    const handleResetPassword = async (event) => {
        event.preventDefault();
        const password = event.target.password.value;
        const repeatPassword = event.target.repeatPassword.value;

        if (password !== repeatPassword) {
            alert('Mật khẩu không khớp!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/users/${currentUser.User_ID}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Chỉ gửi các trường cần cập nhật
                    password: password,
                    fullname: currentUser.Fullname,
                    address: currentUser.Address,
                }),
            });

            if (response.ok) {
                alert('Đặt lại mật khẩu thành công!');
                setCurrentUser(null); // Xóa thông tin user tạm thời sau khi hoàn tất
                const modalInstance = window.bootstrap.Modal.getInstance(document.getElementById('resetPasswordModal'));
                modalInstance.hide();
            } else {
                alert('Lỗi khi đặt lại mật khẩu!');
            }
        } catch (error) {
            console.error('Lỗi khi đặt lại mật khẩu:', error);
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
                                <button className="btn btn-link" onClick={() => { setIsLogin(true); setIsForgotPassword(false); setIsResetPassword(false); }}>Đăng Nhập</button>
                                <span> / </span>
                                <button className="btn btn-link" onClick={() => { setIsLogin(false), setIsForgotPassword(false); setIsResetPassword(false);}}>Đăng Ký</button>
                            </div>

                            {isLogin && !isForgotPassword && !isResetPassword ? (
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
                            ) : !isLogin && !isForgotPassword && !isResetPassword ? (
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
                            ) : isForgotPassword && !isLogin && !isResetPassword ?(
                                <form id="forgotPasswordForm" onSubmit={handleForgotPassword}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="usernameforgot" name="usernameforgot" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fullname" className="form-label">Full Name</label>
                                        <input type="text" className="form-control" id="fullnameforgot" name="fullnameforgot" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="addressforgot" name="addressforgot" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Xác Minh</button>
                                </form>
                            ):(
                                <form id="resetPasswordForm" onSubmit={handleResetPassword}>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password mới</label>
                                        <input type="password" className="form-control" id="password" name="password" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="repeatPassword" className="form-label">Xác nhận Password</label>
                                        <input type="password" className="form-control" id="repeatPassword" name="repeatPassword" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Lưu</button>
                                </form>
                            )
                            }
                        </div>
                        {!isForgotPassword && (
                            <>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {isLogin && (
                                        <button type="button" className="btn btn-link" onClick={() => {setIsForgotPassword(true); setIsLogin(false); setIsResetPassword(false);}}>Quên mật khẩu?</button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modals;
