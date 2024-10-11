USE LibraryDB;
GO

-- Hàm tìm Book_ID trống nhỏ nhất
CREATE FUNCTION fn_find_available_book_id()
RETURNS INT
AS
BEGIN
    DECLARE @available_id INT;

	IF NOT EXISTS (SELECT 1 FROM Books WHERE Book_ID = 1)
	BEGIN
	     SET @available_id = 1;
	END
	ELSE
	BEGIN
    -- Tìm ID trống nhỏ nhất
    SELECT @available_id = MIN(t1.Book_ID + 1)
    FROM Books t1
    LEFT JOIN Books t2 ON t1.Book_ID + 1 = t2.Book_ID
    WHERE t2.Book_ID IS NULL;

    -- Nếu không có ID trống, trả về ID tiếp theo lớn nhất
    IF @available_id IS NULL
    BEGIN
        SELECT @available_id = MAX(Book_ID) + 1 FROM Books;
    END
	END

    RETURN @available_id;
END;
GO

-- Thủ tục thêm sách với ID có sẵn hoặc auto-increment
CREATE PROCEDURE sp_add_book_with_available_id
(
    @title NVARCHAR(255),
    @author NVARCHAR(100),
    @publisher NVARCHAR(100),
    @price DECIMAL(10, 2),
    @publication_year INT,
    @page_count INT,
    @stock_date DATE,
    @status INT = 0
)
AS
BEGIN
    DECLARE @available_id INT;

    -- Gọi hàm tìm ID trống
    SET @available_id = dbo.fn_find_available_book_id();

    -- Thêm sách với ID tìm được
    SET IDENTITY_INSERT Books ON;
    INSERT INTO Books (Book_ID, Title, Author, Publisher, Price, Publication_Year, Page_count, Stock_date, Status)
    VALUES (@available_id, @title, @author, @publisher, @price, @publication_year, @page_count, @stock_date, @status);
    SET IDENTITY_INSERT Books OFF;

    SELECT 'Book created with reused ID' AS Message;
END;
GO