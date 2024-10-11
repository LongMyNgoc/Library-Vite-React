USE LibraryDB;
GO

-- Hàm tìm User_ID trống nhỏ nhất
CREATE FUNCTION fn_find_available_id()
RETURNS INT
AS
BEGIN
    DECLARE @available_id INT;
	IF NOT EXISTS (SELECT 1 FROM Users WHERE User_ID = 1)
	BEGIN
	     SET @available_id = 1;
	END
	ELSE
	BEGIN
    -- Tìm ID trống nhỏ nhất
    SELECT @available_id = MIN(t1.User_ID + 1)
    FROM Users t1
    LEFT JOIN Users t2 ON t1.User_ID + 1 = t2.User_ID
    WHERE t2.User_ID IS NULL;

    -- Nếu không có ID trống, trả về ID tiếp theo lớn nhất
    IF @available_id IS NULL
    BEGIN
        SELECT @available_id = MAX(User_ID) + 1 FROM Users;
    END
	END

    RETURN @available_id;
END;
GO

-- Thủ tục thêm user với ID có sẵn hoặc auto-increment
CREATE PROCEDURE sp_add_account_with_available_id
(
    @username NVARCHAR(100),
    @password NVARCHAR(255),
    @fullname NVARCHAR(255) = NULL,
    @address NVARCHAR(255) = NULL
)
AS
BEGIN
    DECLARE @available_id INT;

    -- Gọi hàm tìm ID trống
    SET @available_id = dbo.fn_find_available_id();

    -- Kiểm tra username đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM Users WHERE Username = @username)
    BEGIN
        SELECT 'Error: Username already exists.' AS Message;
    END
    ELSE
    BEGIN
        -- Thêm user với ID tìm được
        SET IDENTITY_INSERT Users ON;
        INSERT INTO Users (User_ID, Username, Password, Fullname, Address)
        VALUES (@available_id, @username, @password, @fullname, @address);
        SET IDENTITY_INSERT Users OFF;

        SELECT 'User created' AS Message;
    END
END;
GO

