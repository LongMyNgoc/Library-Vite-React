USE LibraryDB;
GO

-- Function to find the smallest available Borrow_ID or return 1 if ID 1 does not exist
CREATE FUNCTION fn_find_available_borrow_id()
RETURNS INT
AS
BEGIN
    DECLARE @available_id INT;

    -- Check if Borrow_ID = 1 does not exist
    IF NOT EXISTS (SELECT 1 FROM BorrowingRecords WHERE Borrow_ID = 1)
    BEGIN
        -- If ID 1 does not exist, return 1
        SET @available_id = 1;
    END
    ELSE
    BEGIN
        -- Find the smallest available ID if ID 1 exists
        SELECT @available_id = MIN(t1.Borrow_ID + 1)
        FROM BorrowingRecords t1
        LEFT JOIN BorrowingRecords t2 ON t1.Borrow_ID + 1 = t2.Borrow_ID
        WHERE t2.Borrow_ID IS NULL;

        -- If no available ID is found, return the next largest ID
        IF @available_id IS NULL
        BEGIN
            SELECT @available_id = COALESCE(MAX(Borrow_ID) + 1, 1) FROM BorrowingRecords;
        END
    END

    RETURN @available_id;
END;
GO

-- Procedure to add a borrowing record with an available or auto-incremented ID
CREATE PROCEDURE sp_add_borrowing_record_with_available_id
(
    @username NVARCHAR(100),
    @book_id INT
)
AS
BEGIN
    DECLARE @available_id INT;

    -- Call the function to find the available Borrow_ID
    SET @available_id = dbo.fn_find_available_borrow_id();

    -- Check if the username exists in the BorrowingRecords table
    IF NOT EXISTS (SELECT 1 FROM Users WHERE Username = @username)
    BEGIN
        SELECT 'Error: Username does not exist.' AS Message;
    END
    ELSE
    BEGIN
        -- Insert the borrowing record with the found ID
        SET IDENTITY_INSERT BorrowingRecords ON;
        INSERT INTO BorrowingRecords (Borrow_ID, Username, Book_ID, Borrow_Date, Status)
        VALUES (@available_id, @username, @book_id, GETDATE(), 1);
        SET IDENTITY_INSERT BorrowingRecords OFF;

        SELECT 'Borrowing record created' AS Message;
    END
END;
GO
