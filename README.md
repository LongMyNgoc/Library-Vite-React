# Library
## Mô tả
Đây là chương trình quản lý thư viện sử dụng FrameWork React và build tool Vite. Database sử dụng là SQLServer. Ngôn ngữ sử dụng là JavaScript+SWC, HTML, CSS, BootStrap
## Yêu cầu
- Cài đặt Node.js v20.17.0
- Cài đặt SQLServer
## Cài đặt
1. Chạy lệnh
   ```bash
npm install
```
2. Chạy lệnh
```bash
npm run dev
```
## Tạo Database
Tạo Database bằng thông tin được lưu trong file Library.sql
## Điều chỉnh Thông tin kết nối SQLServer trong file Server.js
- user: username
- password: password
- server: my server
- database: my database
## Sử Dụng
Để chạy dự án, hãy sử dụng lệnh sau:
```bash
node Server.js
```
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
