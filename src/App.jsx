import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import BookTable from './BookTable';
import Modals from './Modal';
import './App.css';

function App() {
    return (
        <div className="App">
            <Header />
            <Navbar />
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12">
                        <BookTable />
                    </div>
                </div>
            </div>
            <Modals /> 
        </div>
    );
}

export default App; 
