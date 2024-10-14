import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const TotalBookStatisticsButton = () => {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [totalBooks, setTotalBooks] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/books');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Fetched books:', data);
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleClick = () => {
        const count = books.length;
        setTotalBooks(count);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <>
            <div className="text-center mt-4">
                <Button 
                    variant="success" 
                    size="lg" 
                    onClick={handleClick} 
                >
                    Thống kê số lượng sách
                </Button>
            </div>

            {/* Modal hiển thị tổng số lượng sách */}
            {showModal && (
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thông Tin Sách</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Tổng số lượng sách hiện có: <strong>{totalBooks}</strong></p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default TotalBookStatisticsButton;
