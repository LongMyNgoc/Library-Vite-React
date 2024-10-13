import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddBookButton = ({ buttonText }) => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publisher: '',
        price: '',
        publicationYear: '',
        pageCount: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAddBook = async () => {
        // Kiểm tra xem tất cả các trường đã được điền hay chưa
        for (const key in formData) {
            if (!formData[key]) {
                alert(`Vui lòng nhập ${key}`);
                return;
            }
        }
    
        try {
            const response = await fetch('http://localhost:3000/books', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
    
            // Kiểm tra mã trạng thái trước khi gọi response.json()
            if (!response.ok) {
                const errorText = await response.text(); // Lấy nội dung phản hồi
                throw new Error(errorText);
            }
    
            const result = await response.json();
            alert(result.Message); // Hiển thị thông báo nếu thêm sách thành công
            setShowModal(false); // Đóng modal
            setFormData({ // Reset form sau khi thêm sách
                title: '',
                author: '',
                publisher: '',
                price: '',
                publicationYear: '',
                pageCount: ''
            });
        } catch (err) {
            alert('Lỗi khi thêm sách: ' + err.message);
        }
    };    

    return (
        <div className="text-center mt-4">
            <Button 
                variant="success" 
                size="lg" 
                onClick={() => setShowModal(true)}
            >
                {buttonText}
            </Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Sách Mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="title" 
                                value={formData.title} 
                                onChange={handleInputChange} 
                                placeholder="Nhập tên sách" 
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="author" 
                                value={formData.author} 
                                onChange={handleInputChange} 
                                placeholder="Nhập tên tác giả" 
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="publisher" 
                                value={formData.publisher} 
                                onChange={handleInputChange} 
                                placeholder="Nhập nhà xuất bản" 
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
                                type="number" 
                                step="0.01" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleInputChange} 
                                placeholder="Nhập giá" 
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Publication Year</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="publicationYear" 
                                value={formData.publicationYear} 
                                onChange={handleInputChange} 
                                placeholder="Nhập năm xuất bản" 
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Page Count</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="pageCount" 
                                value={formData.pageCount} 
                                onChange={handleInputChange} 
                                placeholder="Nhập số trang" 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={handleAddBook}>
                        Thêm Sách
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddBookButton;
