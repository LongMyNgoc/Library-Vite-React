import React from 'react';

const Navbar = ({ isLoggedIn, user, handleLogout }) => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mt-3">
        <div className="container-fluid">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" href="/">TRANG CHỦ</a>
                </li>

                {isLoggedIn && user?.role === 'user' && (
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {user?.Username}
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="userDropdown">
                            <li><a className="dropdown-item" href="/information">Information</a></li>
                            <li><a className="dropdown-item" href="/penaltyfee">Borrowed Books</a></li>
                            <li><a className="dropdown-item" href="/history">History of borrowing books</a></li>
                        </ul>
                    </li>
                )}

                {/* Hiển thị MANAGE nếu user là admin */}
                {isLoggedIn && user?.role === 'admin' && (
                    <>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="manageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                MANAGE
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="manageDropdown">
                                <li><a className="dropdown-item" href="/users">User</a></li>
                                <li><a className="dropdown-item" href="/borrowing-records">Borrowing Records</a></li>
                                <li><a className="dropdown-item" href="/books">Books</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="statisticsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                STATISTICS
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="statisticsDropdown">
                                <li><a className="dropdown-item" href="/user-statistics">User</a></li>
                                <li><a className="dropdown-item" href="/book-statistics">Books</a></li>
                            </ul>
                        </li>
                    </>
                )}
            </ul>

            {/* Hiển thị nút Login nếu chưa đăng nhập */}
            {!isLoggedIn ? (
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                    Login
                </button>
            ) : (
                <span className="navbar-text">
                    Chào, {user?.Username} | <button className="btn btn-danger" onClick={handleLogout}>Đăng Xuất</button>
                </span>
            )}
        </div>
    </nav>
);

export default Navbar;
