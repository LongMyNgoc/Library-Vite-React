USE LibraryDB;

CREATE FUNCTION Check_Book_Exists(@BookID INT)
RETURNS BIT
AS
BEGIN
    DECLARE @Exists BIT;

    -- Kiểm tra xem Book_ID có tồn tại trong bảng Book_Statistics hay không
    IF EXISTS (SELECT 1 FROM Book_Statistics WHERE Book_ID = @BookID)
        SET @Exists = 1;  -- Book_ID đã tồn tại
    ELSE
        SET @Exists = 0;  -- Book_ID không tồn tại

    RETURN @Exists;
END;

CREATE PROCEDURE Add_Book_Statistic
    @BookID INT,
    @Title VARCHAR(255),
    @Author VARCHAR(100),
    @Publisher VARCHAR(100),
    @Price DECIMAL(10, 2),
    @Publication_Year INT,
    @Page_count INT,
    @Stock_date DATE
AS
BEGIN
    -- Kiểm tra xem Book_ID có tồn tại trong bảng Book_Statistics
    IF EXISTS (SELECT 1 FROM Book_Statistics WHERE Book_ID = @BookID)
    BEGIN
        -- Nếu đã tồn tại, tăng Quantity lên 1
        UPDATE Book_Statistics
        SET Quantity = Quantity + 1
        WHERE Book_ID = @BookID;
    END
    ELSE
    BEGIN
        -- Nếu không tồn tại, thêm bản ghi mới
        INSERT INTO Book_Statistics (Book_ID, Title, Author, Publisher, Price, Publication_Year, Page_count, Stock_date)
        VALUES (@BookID, @Title, @Author, @Publisher, @Price, @Publication_Year, @Page_count, @Stock_date);
    END
END;
