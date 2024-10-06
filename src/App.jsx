import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Thêm import cho Router
import Header from './components/Header';
import Navbar from './components/Navbar';
import BookTable from './components/BookTable';
import Books from './components/Books'; // Import Books component
import Users from './components/Users';
import BorrowingRecords from './components/BorrowingRecords';
import Modals from './components/Modal';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Navbar />
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-md-12">
                            <Routes>
                                <Route path="/" element={<BookTable />} /> {/* Route cho BookTable */}
                                <Route path="/books" element={<Books />} /> {/* Route cho Books */}
                                <Route path="/users" element={<Users />} />
                                <Route path="/borrowing-records" element={<BorrowingRecords />} />
                            </Routes>
                        </div>
                    </div>
                </div>
                <Modals />
            </div>
        </Router>
    );
}

export default App;
