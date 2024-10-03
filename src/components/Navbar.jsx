import React from 'react';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mt-3">
        <div className="container-fluid">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <a className="nav-link active" href="/">TRANG CHỦ</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">ĐĂNG NHẬP</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#registerModal">ĐĂNG KÝ</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="manageDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        MANAGE
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="manageDropdown">
                        <li><a className="dropdown-item" href="/users">User</a></li>
                        <li><a className="dropdown-item" href="/borrowing-records">BorrowingRecords</a></li>
                        <li><a className="dropdown-item" href="/books">Book</a></li> {/* Đường dẫn đến Books.jsx */}
                    </ul>
                </li>
            </ul>
            <span className="navbar-text">
                Địa chỉ: 280 An Dương Vương, P4, Q5 | SĐT: 0363291823 | 
                <a href="mailto:longmyngoc2004@gmail.com" className="btn btn-warning">Email</a>
            </span>
        </div>
    </nav>
);

export default Navbar;
