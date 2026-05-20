# 👟 UrbanStep Store - Giao diện React

Đây là phiên bản giao diện của UrbanStep Store đã được chuyển đổi sang kiến trúc **React + Vite** hiện đại.

## 🚀 Hướng dẫn khởi chạy

1. **Cài đặt các gói thư viện**:
   Mở terminal tại thư mục `frontend` và chạy lệnh:
   ```bash
   npm install
   ```

2. **Chạy ứng dụng ở chế độ phát triển (Development)**:
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173`. Các yêu cầu API sẽ được chuyển tiếp (proxy) đến `http://localhost:3000`.

3. **Đảm bảo Backend đang chạy**:
   Mở một terminal khác (tại thư mục gốc của dự án) và chạy lệnh:
   ```bash
   npm start
   ```

## 📂 Cấu trúc thư mục

Dự án tuân thủ cấu trúc quy định trong `note.md`:
- `src/components/`: Các thành phần UI có thể tái sử dụng (Card, Button, Carousel, Filters...).
- `src/layout/`: Các thành phần bố cục chung (Header).
- `src/pages/`: Các trang chính của ứng dụng (Trang chủ, Đăng nhập, Chi tiết sản phẩm).
- `src/context/`: Quản lý trạng thái xác thực và dữ liệu toàn cục (AuthContext).
- `src/services/`: Xử lý gọi API và giao tiếp với server.
- `src/utils/`: Các hàm hỗ trợ, tiện ích và định dạng dữ liệu.

## 🛠 Công nghệ sử dụng
- **React 18** & **Vite**
- **Tailwind CSS** (Cấu hình local)
- **Lucide React** (Icons)
- **Swiper JS** (Slider hình ảnh)
- **Context API** (Quản lý State)
