USE LibraryDB;

CREATE PROCEDURE Add_User_Statistic
    @Username NVARCHAR(100),
    @Password NVARCHAR(255),
    @Fullname NVARCHAR(255),
    @Address NVARCHAR(255)
AS
BEGIN
    -- Kiểm tra xem Username có tồn tại trong bảng User_Statistics
    IF EXISTS (SELECT 1 FROM User_Statistics WHERE Username = @Username)
    BEGIN
        -- Nếu đã tồn tại, tăng Quantity lên 1
        UPDATE User_Statistics
        SET Quantity = Quantity + 1
        WHERE Username = @Username;
    END
    ELSE
    BEGIN
        -- Nếu không tồn tại, thêm bản ghi mới
        INSERT INTO User_Statistics (Username, Password, Fullname, Address)
        VALUES (@Username, @Password, @Fullname, @Address);
    END
END;
