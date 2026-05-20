# 👟 UrbanStep Store - Sport Shoes E-commerce

UrbanStep Store là một ứng dụng web bán giày thể thao tinh gọn, cung cấp đầy đủ giao diện người dùng (UI) và hệ thống API xử lý logic nghiệp vụ. Dự án tập trung vào tính trải nghiệm mượt mà, giao diện hiện đại và cấu trúc code sạch sẽ.

## 🚀 Tính năng nổi bật

- **Xác thực người dùng:** Đăng nhập thành viên, quản lý phiên làm việc với JWT (giả lập).
- **Trang chủ năng động:** Hiển thị các chương trình khuyến mãi, sản phẩm mới nhất và bộ sưu tập bán chạy.
- **Hệ thống lọc sản phẩm mạnh mẽ:**
  - Tìm kiếm theo từ khóa.
  - Lọc theo danh mục, khoảng giá, đánh giá sao.
  - Lọc sản phẩm còn hàng hoặc đang khuyến mãi.
  - Sắp xếp đa dạng: Mới nhất, Bán chạy, Giá tăng/giảm, Đánh giá cao.
- **Lazy Loading:** Tối ưu hiệu suất hiển thị danh sách sản phẩm với kỹ thuật cuộn vô tận.
- **Trang chi tiết sản phẩm:** Slider hình ảnh chuyên nghiệp (Swiper), thông số kỹ thuật chi tiết và gợi ý sản phẩm cùng loại.
- **Bảo mật & Hiệu suất:** Tích hợp Helmet, Compression, Morgan và quản lý biến môi trường với Dotenv.

## 🛠 Công nghệ sử dụng

- **Backend:** Node.js, Express.js.
- **Frontend:** HTML5, Vanilla JavaScript, Tailwind CSS (CDN), Swiper JS.
- **Tiện ích:** Dotenv, Hel ive Test Runner.

## 📋 Hướng dẫn cài đặt

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Cấu hình môi trường:**
   Tạo file `.env` tại thư mục gốc (đã có file mẫu hoặc được tạo tự động):
   ```text
   PORT=3000
   NODE_ENV=development
   APP_NAME="UrbanStep Store"
   ```

3. **Chạy ứng dụng:**
   ```bash
   # Chế độ thông thường
   npm start

   # Chế độ phát triển
   npm run dev
   ```
   Truy cập tại: `http://localhost:3000`

## 🔐 Tài khoản dùng thử

- **Email:** `member@urbanstep.vn`
- **Mật khẩu:** `123456`

## 📡 Danh sách API chính

| Method | Endpoint | Mô tả |
|---|---|---|
| `POST` | `/api/auth/login` | Đăng nhập hệ thống |
| `GET` | `/api/auth/me` | Lấy thông tin người dùng hiện tại |
| `GET` | `/api/categories` | Lấy danh sách danh mục giày |
| `GET` | `/api/promotions` | Lấy danh sách khuyến mãi |
| `GET` | `/api/products` | Danh sách sản phẩm (hỗ trợ lọc & phân trang) |
| `GET` | `/api/products/:slug` | Chi tiết sản phẩm theo slug |
| `GET` | `/api/products/top` | Top sản phẩm bán chạy/xem nhiều |

## 🧪 Kiểm thử

Dự án đi kèm với bộ test case để đảm bảo logic nghiệp vụ hoạt động đúng:
```bash
npm test
```

---
*Dự án được tối ưu hóa cấu trúc bởi Gemini CLI.*
