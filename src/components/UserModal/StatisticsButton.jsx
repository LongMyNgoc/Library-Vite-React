import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const StatisticsButton = ({ userWithMaxQuantity }) => {
    const [showModal, setShowModal] = useState(false);

    // Hàm để mở modal
    const handleShow = () => setShowModal(true);

    // Hàm để đóng modal
    const handleClose = () => setShowModal(false);

    return (
        <>
            {/* Nút thống kê được căn giữa */}
            <div className="d-flex justify-content-center mt-4">
                <Button 
                    variant="info" 
                    onClick={handleShow}
                >
                    Thống Kê User
                </Button>
            </div>

            {/* Modal hiển thị thông tin user có Quantity lớn nhất */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin người dùng có Quantity lớn nhất</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userWithMaxQuantity ? (
                        <Form>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={userWithMaxQuantity.Username} 
                                    readOnly 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={userWithMaxQuantity.Password} 
                                    readOnly 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={userWithMaxQuantity.Fullname} 
                                    readOnly 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={userWithMaxQuantity.Address} 
                                    readOnly 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Registration Date</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={new Date(userWithMaxQuantity.Registration_Date).toLocaleDateString('en-CA')} 
                                    readOnly 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={userWithMaxQuantity.Quantity} 
                                    readOnly 
                                />
                            </Form.Group>
                        </Form>
                    ) : (
                        <p>Không có thông tin người dùng</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StatisticsButton;
