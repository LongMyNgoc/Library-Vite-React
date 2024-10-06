USE LibraryDB;
GO

CREATE FUNCTION fn_find_available_id()
RETURNS INT
AS
BEGIN
    DECLARE @available_id INT;

    -- Find the smallest available ID
    SELECT @available_id = MIN(t1.User_ID + 1)
    FROM Users t1
    LEFT JOIN Users t2 ON t1.User_ID + 1 = t2.User_ID
    WHERE t1.User_ID + 1 < (SELECT MAX(User_ID) FROM Users)
    AND t2.User_ID IS NULL;

    RETURN @available_id;
END;
GO

CREATE PROCEDURE sp_add_account_with_available_id
(
    @username NVARCHAR(100),
    @password NVARCHAR(255),
    @fullname NVARCHAR(255) = NULL,
    @address NVARCHAR(255) = NULL
)
AS
BEGIN
    -- Declare a variable to store the available ID
    DECLARE @available_id INT;

    -- Call the function fn_find_available_id to find an available ID
    SET @available_id = dbo.fn_find_available_id();

    -- Check if the username already exists
    IF EXISTS (SELECT 1 FROM Users WHERE Username = @username)
    BEGIN
        SELECT 'Error: Username already exists.' AS Message;
    END
    ELSE
    BEGIN
        -- If there is an available ID, add the user with that ID
        IF @available_id IS NOT NULL
        BEGIN
            SET IDENTITY_INSERT Users ON;

            -- Insert the user with the found available ID
            INSERT INTO Users (User_ID, Username, Password, Fullname, Address)
            VALUES (@available_id, @username, @password, @fullname, @address);

            SET IDENTITY_INSERT Users OFF;
            SELECT 'User created with reused ID' AS Message;
        END
        ELSE
        BEGIN
            -- If there is no available ID, add the user with an auto-incremented ID
            INSERT INTO Users (Username, Password, Fullname, Address)
            VALUES (@username, @password, @fullname, @address);

            SELECT 'User created with new ID' AS Message;
        END
    END
END;
GO

EXEC sp_add_account_with_available_id 'user3', 'password4', 'John Doe', '123 Main St';

select * from Users
delete from Users where User_ID = 3;
