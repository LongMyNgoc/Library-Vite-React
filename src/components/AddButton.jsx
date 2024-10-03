import React from 'react';

const AddBookButton = ({ buttonText }) => {
    return (
        <div className="text-center mt-4"> {/* Center the button */}
            <button 
                className="btn btn-success btn-lg" // Class for styling
                onClick={() => alert(`${buttonText} clicked`)} // Hiện alert với tên nút
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    transition: 'background-color 0.3s ease',
                    marginBottom: '20px', // Khoảng cách bên dưới button
                    marginTop: '20px' // Khoảng cách phía trên button
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4caf50'} // Thay đổi màu khi hover
                onMouseLeave={e => e.currentTarget.style.backgroundColor = ''} // Quay lại màu ban đầu
            >
                {buttonText} {/* Hiển thị giá trị truyền vào */}
            </button>
        </div>
    );
};

export default AddBookButton;
