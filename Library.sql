
CREATE DATABASE LibraryDB;

USE LibraryDB;

CREATE TABLE Books (
    Book_ID INT PRIMARY KEY IDENTITY(1,1),  
    Title VARCHAR(255) NOT NULL,             
    Author VARCHAR(100) NOT NULL,             
    Publisher VARCHAR(100) NOT NULL,         
    Price DECIMAL(10, 2) NOT NULL,           
    Publication_Year INT NOT NULL,           
    Page_count INT NOT NULL,                   
    Stock_date DATE NOT NULL,                 
    Status INT DEFAULT 0                       
);

INSERT INTO Books (Title, Author, Publisher, Price, Publication_year, Page_count, Stock_date, Status) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', 10.99, 1925, 180, '2024-01-15', 0),
('To Kill a Mockingbird', 'Harper Lee', 'J.B. Lippincott & Co.', 7.99, 1960, 281, '2024-01-16', 0),
('1984', 'George Orwell', 'Secker & Warburg', 8.99, 1949, 328, '2024-01-17', 0),
('Pride and Prejudice', 'Jane Austen', 'T. Egerton', 6.99, 1813, 279, '2024-01-18', 0),
('The Catcher in the Rye', 'J.D. Salinger', 'Little, Brown and Company', 9.99, 1951, 277, '2024-01-19', 0),
('Moby Dick', 'Herman Melville', 'Harper & Brothers', 11.50, 1851, 585, '2024-01-20', 0),
('War and Peace', 'Leo Tolstoy', 'The Russian Messenger', 14.99, 1869, 1225, '2024-01-21', 0),
('The Odyssey', 'Homer', 'Various', 12.00, -800, 400, '2024-01-22', 0),
('The Hobbit', 'J.R.R. Tolkien', 'George Allen & Unwin', 10.99, 1937, 310, '2024-01-23', 0),
('Fahrenheit 451', 'Ray Bradbury', 'Ballantine Books', 8.50, 1953, 158, '2024-01-24', 0);

CREATE TABLE Admins (
    Admin_ID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100) NOT NULL UNIQUE,  
    Password NVARCHAR(255) NOT NULL  
);

INSERT INTO Admins (Username, Password)
VALUES 
('LongMyNgoc', 'LongMyNgoc'),
('Thoai', '123456'),
('Thong', '123456'),
('Dan', '123456');

CREATE TABLE Users (
    User_ID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100) NOT NULL UNIQUE,  
    Password NVARCHAR(255) NOT NULL,  
    Fullname NVARCHAR(255),
    Address NVARCHAR(255), 
    Registration_Date DATE DEFAULT GETDATE()
);

INSERT INTO Users (Username, Password, Fullname, Address)
VALUES 
('user1', 'password1', 'Nguyen Van A', '280 An Dương Vương, P4, Q5'),
('user2', 'password2', 'Tran Thi B', '123 Le Loi, P1, Q3'),
('user3', 'password3', 'Le Van C', '456 Nguyen Trai, P2, Q1'),
('user4', 'password4', 'Pham Thi D', '789 Tran Hung Dao, P5, Q10'),
('user5', 'password5', 'Hoang Van E', '321 Hai Ba Trung, P6, Q1');

CREATE TABLE BorrowingRecords (
    Borrow_ID INT PRIMARY KEY IDENTITY(1,1), 
    Username NVARCHAR(100) NOT NULL,         
    Book_ID INT NOT NULL,                    
    Borrow_Date DATE DEFAULT GETDATE(),      
    Return_Date AS DATEADD(DAY, 7, Borrow_Date), 
    Status BIT DEFAULT 1,                   
    
    CONSTRAINT FK_BorrowingRecords_Users FOREIGN KEY (Username) 
    REFERENCES Users(Username) ON DELETE CASCADE,
    
    CONSTRAINT FK_BorrowingRecords_Books FOREIGN KEY (Book_ID) 
    REFERENCES Books(Book_ID) ON DELETE CASCADE
);

INSERT INTO BorrowingRecords (Username, Book_ID)
VALUES 
('user1', 1),
('user2', 2);