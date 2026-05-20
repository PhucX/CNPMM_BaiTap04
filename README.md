# 👟 UrbanStep Store - Sport Shoes E-commerce

UrbanStep Store là một ứng dụng thương mại điện tử bán giày thể thao hoàn chỉnh, bao gồm hệ thống API (Backend) và giao diện người dùng hiện đại (Frontend).

## 🏗 Cấu trúc dự án

Dự án được chia thành hai phần chính:

- **`backend/`**: Xây dựng bằng Node.js & Express. Tổ chức theo mô hình Controller-Service-Route chuyên nghiệp.
- **`frontend/`**: Xây dựng bằng React & Vite. Sử dụng Tailwind CSS và kiến trúc component modular.

## 🚀 Hướng dẫn cài đặt & Khởi chạy

### 1. Cài đặt Backend
```bash
cd backend
npm install
npm start
```
Server sẽ chạy tại: `http://localhost:3000`

### 2. Cài đặt Frontend
```bash
cd frontend
npm install
npm run dev
```
Giao diện sẽ chạy tại: `http://localhost:5173`

## 🔐 Tài khoản dùng thử

- **Email:** `member@urbanstep.vn`
- **Mật khẩu:** `123456`

## 📡 Danh sách API chính

Hệ thống sử dụng xác thực bằng Bearer Token.

| Loại | Method | Endpoint | Mô tả |
|---|---|---|---|
| Auth | `POST` | `/api/auth/login` | Đăng nhập lấy Token |
| Auth | `GET` | `/api/auth/me` | Lấy thông tin tài khoản hiện tại |
| Catalog | `GET` | `/api/categories` | Danh sách danh mục giày |
| Catalog | `GET` | `/api/products` | Danh sách sản phẩm (hỗ trợ lọc/phân trang) |
| Catalog | `GET` | `/api/products/:slug` | Chi tiết sản phẩm |
| Catalog | `GET` | `/api/home` | Dữ liệu cho trang chủ |

## 🧪 Kiểm thử

- **Backend Tests:** `cd backend && npm test`
- **API Testing:** Sử dụng file `UrbanStep_Store.postman_collection.json` đính kèm để test trên Postman.

---
*Dự án được tối ưu hóa cấu trúc bởi Gemini CLI.*
