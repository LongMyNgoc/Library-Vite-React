import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import BookTable from './components/BookTable';
import Books from './components/Books';
import UserList from './components/Users';
import BookStatistic from './components/Book_Statistics';
import UserStatistics from './components/User_Statistics';
import BorrowingRecords from './components/BorrowingRecords';
import PenaltyFee from './components/PenaltyFee';
import Modals from './components/Modal';
import HistoryUser from './components/HistoryUser';
import InformationUser from './components/UserModal/InformationUser';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Kiểm tra localStorage khi ứng dụng được khởi động
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user'); // Xóa thông tin user khi đăng xuất
        window.location.href = '/'; // Chuyển hướng về trang chủ
    };

    const handleLoginSuccess = (loggedInUser) => {
        setUser(loggedInUser);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(loggedInUser)); // Lưu thông tin user vào localStorage
    };

    return (
        <Router>
            <ToastContainer />
            <div className="App">
                <Header />
                <Navbar isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout} />
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-12">
                            <Routes>
                                <Route path="/" element={<BookTable isLoggedIn={isLoggedIn} user={user} />} />
                                {isLoggedIn && user?.role === 'admin' && (
                                    <>
                                        <Route path="/users" element={<UserList />} />
                                        <Route path="/borrowing-records" element={<BorrowingRecords />} />
                                        <Route path="/books" element={<Books />} />
                                        <Route path='/book-statistics' element={<BookStatistic />} />
                                        <Route path='/user-statistics' element={<UserStatistics />} />
                                    </>
                                )}
                                {isLoggedIn && user?.role === 'user' && (
                                    <>
                                    <Route path="/penaltyfee" element={<PenaltyFee isLoggedIn={isLoggedIn} user={user}/>} />
                                    <Route path='/history' element={<HistoryUser isLoggedIn={isLoggedIn} user={user}/>} />
                                    <Route path='/information' element={<InformationUser isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout}/>} />
                                    </>
                                )}
                            </Routes>
                        </div>
                    </div>
                </div>
                <Modals setUser={handleLoginSuccess} setIsLoggedIn={setIsLoggedIn} />
            </div>
        </Router>
    );
}

export default App;
