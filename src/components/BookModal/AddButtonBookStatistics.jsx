import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBookButton = ({ buttonText, bookWithMaxQuantity }) => {
    const [showModal, setShowModal] = useState(false);

    // Hàm để mở modal
    const handleShow = () => setShowModal(true);

    // Hàm để đóng modal
    const handleClose = () => setShowModal(false);

    return (
        <>
            <div className="text-center mt-4">
                <Button 
                    variant="success" 
                    size="lg" 
                    onClick={handleShow} // Mở modal khi nhấn nút
                >
                    {buttonText}
                </Button>
            </div>

            {/* Modal hiển thị thông tin sách */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin sách có Quantity lớn nhất</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {bookWithMaxQuantity ? (
                        <Form>
                            <Form.Group>
                                <Form.Label>Book ID</Form.Label>
                                <Form.Control type="text" value={bookWithMaxQuantity.Book_ID} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" value={bookWithMaxQuantity.Title} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Author</Form.Label>
                                <Form.Control type="text" value={bookWithMaxQuantity.Author} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Publisher</Form.Label>
                                <Form.Control type="text" value={bookWithMaxQuantity.Publisher} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" value={bookWithMaxQuantity.Price} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Publication Year</Form.Label>
                                <Form.Control type="text" value={bookWithMaxQuantity.Publication_Year} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Page Count</Form.Label>
                                <Form.Control type="text" value={bookWithMaxQuantity.Page_count} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Stock Date</Form.Label>
                                <Form.Control type="text" value={new Date(bookWithMaxQuantity.Stock_date).toLocaleDateString('en-CA')} readOnly />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="text" value={bookWithMaxQuantity.Quantity} readOnly />
                            </Form.Group>
                        </Form>
                    ) : (
                        <p>No book data available</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddBookButton;
