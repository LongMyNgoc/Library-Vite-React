
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
('Fahrenheit 451', 'Ray Bradbury', 'Ballantine Books', 8.50, 1953, 158, '2024-01-24', 0),
('Brave New World', 'Aldous Huxley', 'Chatto & Windus', 12.99, 1932, 311, '2024-01-25', 0),
('The Picture of Dorian Gray', 'Oscar Wilde', 'Ward, Lock & Co.', 9.99, 1890, 254, '2024-01-26', 0),
('The Alchemist', 'Paulo Coelho', 'HarperCollins', 15.00, 1988, 208, '2024-01-27', 0),
('The Road', 'Cormac McCarthy', 'Knopf', 14.99, 2006, 287, '2024-01-28', 0),
('Little Women', 'Louisa May Alcott', 'Roberts Brothers', 8.99, 1868, 400, '2024-01-29', 0),
('Gone with the Wind', 'Margaret Mitchell', 'Macmillan', 12.99, 1936, 1037, '2024-01-30', 0),
('The Grapes of Wrath', 'John Steinbeck', 'The Viking Press', 10.99, 1939, 464, '2024-01-31', 0),
('The Kite Runner', 'Khaled Hosseini', 'Riverhead Books', 10.50, 2003, 371, '2024-02-01', 0),
('The Da Vinci Code', 'Dan Brown', 'Doubleday', 15.99, 2003, 689, '2024-02-02', 0),
('The Catch-22', 'Joseph Heller', 'Simon & Schuster', 12.50, 1961, 453, '2024-02-03', 0),
('The Handmaid’s Tale', 'Margaret Atwood', 'McClelland & Stewart', 10.99, 1985, 311, '2024-02-04', 0),
('The Hitchhiker’s Guide to the Galaxy', 'Douglas Adams', 'Pan Books', 9.99, 1979, 224, '2024-02-05', 0),
('Dune', 'Frank Herbert', 'Chilton Books', 14.99, 1965, 412, '2024-02-06', 0),
('A Tale of Two Cities', 'Charles Dickens', 'Chapman & Hall', 7.99, 1859, 489, '2024-02-07', 0),
('Crime and Punishment', 'Fyodor Dostoevsky', 'The Russian Messenger', 11.50, 1866, 430, '2024-02-08', 0),
('Wuthering Heights', 'Emily Brontë', 'Thomas Cautley Newby', 8.50, 1847, 340, '2024-02-09', 0),
('The Odyssey', 'Homer', 'Various', 12.00, -800, 400, '2024-02-10', 0),
('The Old Man and the Sea', 'Ernest Hemingway', 'Charles Scribner’s Sons', 10.99, 1952, 127, '2024-02-11', 0),
('The Color Purple', 'Alice Walker', 'Simon & Schuster', 9.99, 1982, 295, '2024-02-12', 0),
('The Bell Jar', 'Sylvia Plath', 'Heinemann', 12.50, 1963, 288, '2024-02-13', 0),
('The Fault in Our Stars', 'John Green', 'Dutton Books', 12.99, 2012, 313, '2024-02-14', 0),
('The Chronicles of Narnia', 'C.S. Lewis', 'Geoffrey Bles', 14.99, 1950, 768, '2024-02-15', 0),
('The Perks of Being a Wallflower', 'Stephen Chbosky', 'Pocket Books', 10.99, 1999, 213, '2024-02-16', 0),
('The Lovely Bones', 'Alice Sebold', 'Little, Brown and Company', 12.50, 2002, 328, '2024-02-17', 0),
('The Road Less Traveled', 'M. Scott Peck', 'Simon & Schuster', 10.00, 1978, 250, '2024-02-18', 0),
('Where the Crawdads Sing', 'Delia Owens', 'G.P. Putnam’s Sons', 14.99, 2018, 368, '2024-02-19', 0),
('The Silent Patient', 'Alex Michaelides', 'Celadon Books', 12.99, 2019, 336, '2024-02-20', 0),
('Becoming', 'Michelle Obama', 'Crown Publishing Group', 15.00, 2018, 448, '2024-02-21', 0),
('Educated', 'Tara Westover', 'Random House', 12.00, 2018, 334, '2024-02-22', 0),
('The Great Alone', 'Kristin Hannah', 'St. Martin’s Press', 10.50, 2018, 440, '2024-02-23', 0),
('Anxious People', 'Fredrik Backman', 'Atria Books', 11.99, 2020, 352, '2024-02-24', 0),
('The Midnight Library', 'Matt Haig', 'Viking', 10.99, 2020, 304, '2024-02-25', 0),
('The Invisible Life of Addie LaRue', 'V.E. Schwab', 'Tor Books', 14.99, 2020, 448, '2024-02-26', 0);

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
    Title NVARCHAR(255) NOT NULL, -- Thêm cột Title
    Borrow_Date DATE DEFAULT GETDATE(),
    Return_Date AS DATEADD(DAY, 7, Borrow_Date),
    Status BIT DEFAULT 1,
    
    CONSTRAINT FK_BorrowingRecords_Users FOREIGN KEY (Username) 
    REFERENCES Users(Username) ON DELETE CASCADE,
    
    CONSTRAINT FK_BorrowingRecords_Books FOREIGN KEY (Book_ID) 
    REFERENCES Books(Book_ID) ON DELETE CASCADE
);

INSERT INTO BorrowingRecords (Username, Book_ID, Title)
VALUES 
('user4', 4, 'Pride and Prejudice'),
('user5', 5, 'The Catcher in the Rye'),
('user1', 6, 'Moby Dick');
