import sql from 'mssql';
import { dbConfig } from '../config.js';

export const connectDB = async () => {
    try {
        await sql.connect(dbConfig);
        console.log('Kết nối cơ sở dữ liệu thành công');
    } catch (error) {
        console.error('Lỗi kết nối cơ sở dữ liệu:', error);
        throw error;
    }
};
